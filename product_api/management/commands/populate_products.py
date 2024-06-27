from django.core.management.base import BaseCommand
from product_api.models import Product
from datetime import datetime

class Command(BaseCommand):
    help = 'Populates the products table with sample data'

    def handle(self, *args, **kwargs):
        Product.objects.create(name="Product 1", description="Description for product 1", price=10.99, stock=100)
        Product.objects.create(name="Product 2", description="Description for product 2", price=15.99, stock=200)
        Product.objects.create(name="Product 3", description="Description for product 3", price=8.99, stock=150)
        self.stdout.write(self.style.SUCCESS('Successfully populated the database'))
