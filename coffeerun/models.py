from django.db import models
import uuid

class CoffeeOrder(models.Model):
    FLAVOR_SHOTS = (
            ('Caramel', 'Caramel'),
            ('Almond', 'Almond'),
            ('Mocha', 'Mocha')
    )

    COFFEE_SIZES = (
            ('Short', 'Short'),
            ('Tall', 'Tall'),
            ('Grande', 'Grande')
    )

    orderid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    size = models.CharField(max_length=6, choices=COFFEE_SIZES)
    flavor = models.CharField(max_length=7, blank=True)
    order = models.CharField(max_length=50)
    email = models.EmailField()
    caffeine = models.IntegerField()

    def __str__(self):
        return f'{self.size} {self.order}'
