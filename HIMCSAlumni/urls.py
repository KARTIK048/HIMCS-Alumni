from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("about/", views.about, name="about"), 
    path("index/", views.index, name="index"),
    path("register/", views.Register, name="register"),
    path("login/", views.Login, name="login"),
    path("dashboard/", views.dashboard, name="dashboard"),
]