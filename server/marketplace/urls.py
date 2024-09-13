from django.urls import path
from .views import ProductView,AddVariantView

urlpatterns = [
    path('products', ProductView.as_view(), name='product_list'),
    path('products/<str:product_id>/variants/', AddVariantView.as_view(), name='add-variant'),
]