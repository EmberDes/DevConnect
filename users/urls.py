from django.urls import path

from .views import GitHubImportViews


urlpatterns = [
    path('github/import/', GitHubImportViews.as_view(), name ="github-import")
]