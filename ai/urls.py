from django.urls import path

from .views import RepositoryAnalyzeView



urlpatterns = [
    path('ai/analyze/<int:pk>/', RepositoryAnalyzeView.as_view()),
]