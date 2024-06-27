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
        

class CreateProduct(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        price = graphene.Float(required=True)
        stock = graphene.Int(required=True)
        description = graphene.String(required=True)

    product = graphene.Field(ProductType)

    @classmethod
    def mutate(cls, root, info, name, price, stock, description):
        product = Product.objects.create(
            name=name,
            price=price,
            stock=stock,
            description=description
        )
        return CreateProduct(product=product)

class Mutation(graphene.ObjectType):
    create_product = CreateProduct.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
