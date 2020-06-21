from django.forms import ModelForm, ValidationError

from coffeerun.models import CoffeeOrder


class CoffeeOrderForm(ModelForm):
    class Meta:
        model = CoffeeOrder
        exclude = ['orderid']

    def clean_caffeine(self):
        caffeine = self.cleaned_data['caffeine']

        if not 0 <= caffeine <= 100:
            raise ValidationError('Caffeine must be between 0 and 100')

        return caffeine
