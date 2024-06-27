import graphene
from graphene_django.types import DjangoObjectType
from product_api.models import Product

class ProductType(DjangoObjectType):
    class Meta:
        model = Product

class Query(graphene.ObjectType):
    all_products = graphene.List(ProductType)

    def resolve_all_products(self, info):
        return Product.objects.all()

schema = graphene.Schema(query=Query)