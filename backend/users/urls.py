from django.urls import path

from .views import GitHubImportViews
from .views import RegisterView
from .views import SaveAPIKeysView


urlpatterns = [
    path('github/import/', GitHubImportViews.as_view(), name ="github-import"),
    path("register/", RegisterView.as_view(), name="register"),
    path("save-keys/",SaveAPIKeysView.as_view())

]