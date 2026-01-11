from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("about/", views.about, name="about"), 
    path("gallery/", views.gallery, name="gallery"),
    path("directory/", views.directory, name="directory"),
    path("register/", views.Register, name="register"),
    path("login/", views.Login, name="login"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("logout/", views.Logout, name="logout"),
    path("contact/", views.contact, name="contact"),

]