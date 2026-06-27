from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    SignUp,
    ChekUser,
    ResetPass,
    DeleteUser,
    AddError,

)

urlpatterns = [
    path('signup/', SignUp.as_view()),

    # JWT
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),

    path('reset_password/', ResetPass.as_view()),
    path('me/', ChekUser.as_view()),
    
    path('delete/', DeleteUser.as_view()),
    path('addError/', AddError.as_view()),
]