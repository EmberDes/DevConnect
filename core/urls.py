from django.urls import path
from . import views
from .views import HealthCheckView

urlpatterns = [
    path("", views.home, name="home"),
    path("register/", views.register_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("like/<int:post_id>/", views.toggle_like, name="toggle_like"),
    path("health/", HealthCheckView.as_view(),name ='health-check'),
]