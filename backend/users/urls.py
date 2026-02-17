from django.urls import path

from .views import GitHubImportViews
from .views import RegisterView


urlpatterns = [
    path('github/import/', GitHubImportViews.as_view(), name ="github-import"),
    path("register/", RegisterView.as_view(), name="register"),

]