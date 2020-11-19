from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login', views.login_view, name="login"),
    path('register', views.register, name="register"),
    path('logout', views.logout_view, name="logout"),
    path('form/create', views.create_form, name="create_form"),
    path('form/<str:code>/edit', views.edit_form, name="edit_form"),
    path('form/<str:code>/api', views.form_info, name="form_info"),
    path('403', views.FourZeroThree, name="403"),
    path('404', views.FourZeroFour, name="404")
]