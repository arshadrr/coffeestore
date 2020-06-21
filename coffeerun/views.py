import uuid

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse

from coffeerun import forms, models


def index(request):
    return render(request, 'coffeerun/index.html')

def create_order(request):
    ''' creates an order. returns the orderid if valid order otherwise the form errors as JSON
    '''
    form = forms.CoffeeOrderForm(request.POST)

    if form.is_valid():
        model = form.save()
        return HttpResponse(model.orderid)
    else:
        return HttpResponseBadRequest(json.dumps(form.errors))

def delete_order(request):
    '''deletes an order. 200 if successful, 400 if order doesn't exist.
    '''
    orderid = request.POST.get('orderid')

    if orderid == None:
        return HttpResponseBadRequest()

    try:
        order = models.CoffeeOrder.objects.get(orderid=orderid)
        order.delete()
        return HttpResponse()
    except models.CoffeeOrder.DoesNotExist:
        return HttpResponseBadRequest()

def update_order(request):
    '''update an order provided an orderid. 200 if successful, 400 if order doesn't exist.
    '''
    form = forms.CoffeeOrderForm(request.POST)

    if not form.is_valid():
        return HttpResponseBadRequest(json.dumps(form.errors))

    try:
        # request.POST doesnt have 'orderid' -> KeyError
        # orderid isnt a UUID -> ValueError
        # row doesnt exist -> models.CoffeeOrder.DoesNotExist
        order = models.CoffeeOrder.objects.get(
                orderid = uuid.UUID(request.POST['orderid'])
                )
    except (KeyError, ValueError, models.CoffeeOrder.DoesNotExist):
        return HttpResponseBadRequest()

    models.CoffeeOrder.objects.filter(orderid=order.orderid).update(**form.cleaned_data)
    return HttpResponse(status=200)
