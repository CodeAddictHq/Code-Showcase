from django.urls import path
from .views import welCome, ProjectDetailApiView, notFound, ProjectManyApiView, ProjectComments, ProjectCommentsAdd, ProjectCommentsEdit, ProjectCommentsDelete, addReact, getUsername, commentGet, getReacts

from .views import SendPara


urlpatterns = [
    path('', welCome),
    path('text/<slug:slug>/', SendPara.as_view()),
    path('p/', welCome),
    path('p/404/', notFound),
    path('p/<slug:slug>/', ProjectDetailApiView.as_view()),
    path('p/<slug:slug>/c/', ProjectComments.as_view()),
    path('p/<slug:slug>/c/add/', ProjectCommentsAdd.as_view()),
    path('p/<slug:slug>/c/edit/<int:id>', ProjectCommentsEdit.as_view()),
    path('p/<slug:slug>/c/get/<int:id>', commentGet),
    path('p/<slug:slug>/c/del/<int:id>/', ProjectCommentsDelete.as_view()),
    path('p/category/<str:cat>/', ProjectManyApiView.as_view()),
    path('p/<slug:slug>/addreact/', addReact),
    path('p/<slug:slug>/getreacts/', getReacts),
    path('p/get_username/<int:id>/', getUsername),
    

]