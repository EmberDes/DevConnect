from django.urls import path

from .views import AnalyzeRepoView


urlpatterns = [
    path('analyze/', AnalyzeRepoView.as_view()),
]