from django.urls import path
from . import views

urlpatterns = [
    path('3dckt/', views.get_3d, name='get_3d'),
    path('documentation/', views.docs, name='docs'),
    path('', views.index, name='index'),
    path('simulate', views.simulate_custom_circuit, name='simulate'),
    path('chat', views.chat, name='chat'),
]
