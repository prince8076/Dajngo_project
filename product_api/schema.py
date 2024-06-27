import graphene
from graphene_django.types import DjangoObjectType
from .models import Product

class ProductType(DjangoObjectType):
    class Meta:
        model = Product

class Query(graphene.ObjectType):
    all_products = graphene.List(ProductType)
    product = graphene.Field(ProductType, id=graphene.ID())

    def resolve_all_products(self, info, **kwargs):
        return Product.objects.all()

    def resolve_product(self, info, id, **kwargs):
        try:
            return Product.objects.get(pk=int(id))
        except (Product.DoesNotExist, ValueError):
            return None

schema = graphene.Schema(query=Query)
