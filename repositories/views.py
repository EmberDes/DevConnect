from rest_framework import generics
from .models import Repository
from .serializers import RepositorySerializer


class RepositoryListCreateView(generics.ListCreateAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    filterset_fields = ['name']


class RepositoryDetailView(generics.RetrieveAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

class RepositoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer