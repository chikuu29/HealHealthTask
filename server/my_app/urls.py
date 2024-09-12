from django.urls import path

# from Apis.userAuth import checkLoginStatus

from .views import GenerateConfig

urlpatterns = [
    path('app-configurations', GenerateConfig.as_view(), name='app_configuration')
        # path('app-configuration', checkLoginStatus.as_view(),name='session')

]