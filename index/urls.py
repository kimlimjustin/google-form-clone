from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login', views.login_view, name="login"),
    path('register', views.register, name="register"),
    path('logout', views.logout_view, name="logout"),
    path('form/create', views.create_form, name="create_form"),
    path('form/<str:code>/edit', views.edit_form, name="edit_form"),
    path('form/<str:code>/edit_title', views.edit_title, name="edit_title"),
    path('form/<str:code>/edit_description', views.edit_description, name="edit_description"),
    path('form/<str:code>/edit_background_color', views.edit_bg_color, name="edit_background_color"),
    path('form/<str:code>/edit_text_color', views.edit_text_color, name="edit_text_color"),
    path('form/<str:code>/edit_setting', views.edit_setting, name="edit_setting"),
    path('form/<str:code>/delete', views.delete_form, name="delete_form"),
    path('form/<str:code>/edit_question', views.edit_question, name="edit_question"),
    path('form/<str:code>/edit_choice', views.edit_choice, name="edit_choice"),
    path('form/<str:code>/add_choice', views.add_choice, name="add_choice"),
    path('form/<str:code>/remove_choice', views.remove_choice, name="remove_choice"),
    path('form/<str:code>/get_choice/<str:question>', views.get_choice, name="get_choice"),
    path('form/<str:code>/add_question', views.add_question, name="add_question"),
    path('form/<str:code>/delete_question/<str:question>', views.delete_question, name="delete_question"),
    path('form/<str:code>/score', views.score, name="score"),
    path('form/<str:code>/edit_score', views.edit_score, name="edit_score"),
    path('form/<str:code>/answer_key', views.answer_key, name="answer_key"),
    path('form/<str:code>/feedback', views.feedback, name="feedback"),
    path('form/<str:code>/viewform', views.view_form, name="view_form"),
    path('403', views.FourZeroThree, name="403"),
    path('404', views.FourZeroFour, name="404")
]