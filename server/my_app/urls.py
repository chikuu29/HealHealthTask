from django.urls import path

from .views import GenerateConfig

urlpatterns = [
    path('app-configuration/', GenerateConfig.as_view(), name='app_configuration'),
]