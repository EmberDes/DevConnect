from django.urls import path
from .views import (RepositoryListCreateView,RepositoryRetrieveUpdateDestroyView)




urlpatterns = [
    path('', RepositoryListCreateView.as_view(), name='repository-list'),
    path('<int:pk>/', RepositoryRetrieveUpdateDestroyView.as_view(), name='repository-detail'),
]