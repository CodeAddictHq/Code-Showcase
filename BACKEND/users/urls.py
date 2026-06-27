from django.urls import path
from .views import SignUp, LogOut, LogIn, ChekUser, ResetPass, get_csrf, DeleteUser, addError


urlpatterns = [
  path('signup/', SignUp.as_view()),
  path('login/', LogIn.as_view()),
  path('logout/', LogOut.as_view()),
  path('reset_password/', ResetPass.as_view()),
  path('me/', ChekUser.as_view()),
  path('csrf/', get_csrf),
  path('delete/', DeleteUser.as_view()),
  path('addError/', addError.as_view()),
]
