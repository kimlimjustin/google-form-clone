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
    path('form/<str:code>/edit_title', views.edit_title, name="edit_title"),
    path('form/<str:code>/edit_description', views.edit_description, name="edit_description"),
    path('form/<str:code>/edit_background_color', views.edit_bg_color, name="edit_background_color"),
    path('form/<str:code>/edit_text_color', views.edit_text_color, name="edit_text_color"),
    path('403', views.FourZeroThree, name="403"),
    path('404', views.FourZeroFour, name="404")
]