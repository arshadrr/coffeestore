from django.urls import path, include

from . import views

app_name = "coffeestore"

urlpatterns = [
        path('', views.index, name="index"),
        path('create_order/', views.create_order, name="create_order"),
        path('delete_order/', views.delete_order, name="delete_order"),
        path('update_order/', views.update_order, name="update_order"),
]
