from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Code, Reaction, Para
from .serializer import CodeSerializer, CommentSerializer, ReactionSerializer, ParaSerializer
from rest_framework.pagination import PageNumberPagination
from users.models import Comment


@api_view(['GET'])

def welCome(request):
  return Response({'msg':'Page not found'})


@api_view(['GET'])
def notFound(request):
  return Response({'msg':'Hihi humen being'})

 


class ProjectManyApiView(APIView):
  def get(self, request, cat):
    projects = Code.objects.filter(cat=cat).order_by('-id')
    paginator = PageNumberPagination()
    paginator.page_size = 5
    result = paginator.paginate_queryset(projects, request)
    serializedData = CodeSerializer(result, many=True)
    return paginator.get_paginated_response(serializedData.data)

 

 
class ProjectDetailApiView(APIView):
  def get(self, request, slug):
    try: 
      project = (Code.objects.get(slug=slug))
    except:
      return Response({'msg': 'Project doesnt exists'})
    projectData = CodeSerializer(project)
    reactions = {
    'like': len(Reaction.objects.filter(project=project, reaction='like')),
    'love': len(Reaction.objects.filter(project=project, reaction='love')),
    'dislike': len(Reaction.objects.filter(project=project, reaction='dislike')),
    'angry': len(Reaction.objects.filter(project=project, reaction='angry')),
      
    }
    return Response({'project':projectData.data, 'reactions':reactions})

      
class ProjectComments(APIView):
  def get(self, request, slug):
    try:
      project = Code.objects.get(slug=slug)
    except:
      return Response({'msg':'project doesnt exists'})
    comments = Comment.objects.filter(project=project).order_by('-id')
    paginator = PageNumberPagination()
    pageSize=request.query_params.get('page_size')
    if pageSize:
      paginator.page_size= int(pageSize)
    else:
      paginator.page_size=10
    resultsObj = paginator.paginate_queryset(comments, request)
    resultsCom = CommentSerializer(resultsObj, many=True)
    return  paginator.get_paginated_response(resultsCom.data)



class ProjectCommentsAdd(APIView):
  permission_classes = [IsAuthenticated]
  def post(self, request, slug):
    try:
      project = Code.objects.get(slug=slug)
    except:
      return Response({'msg':'Code doesnt exists', "comment_status":False})
    author = request.user
    msg = request.data.get('comment')
    if msg:
      Comment.objects.create(author=author, project=project, msg=msg)
      return Response({"msg":"Comment added successfully", 'comment_status':True})
    elif not msg:
      return Response({"msg":"Empty comment isnt accepted", "comment_status":False})
 
 
class ProjectCommentsEdit(APIView):
  permission_classes = [IsAuthenticated]
  def post(self, request, slug, id):
    comment = Comment.objects.filter(id = id).first()
    if not comment:
      return Response({"msg":"Comment doesnt exists"})
    if comment.author != request.user:
      return Response({"msg":"others comment cant be updated"})
    newmsg = request.data.get("comment")
    comment.msg = newmsg
    comment.save()
    return Response({"msg":"Comment Updated successfully", 'comment_status':True})

@api_view(['GET'])
def commentGet(request, slug, id):
  comment = Comment.objects.filter(id=id).first()
  if not comment:
    return Response({'msg':'Comment doesnt exists', 'comment_status':False})
  serializedData = CommentSerializer(comment)
  return Response({'data':serializedData.data, 'comment_status':True})
  
  
  
class ProjectCommentsDelete(APIView):
  permission_classes = [IsAuthenticated]
  def get(self, request, slug, id):
    comment = Comment.objects.filter(id=id).first()
    if not comment:
      return Response({"msg": "Comment not found"})
    if comment.author != request.user:
      return Response({"msg": "others comment cant be deleted"})
    comment.delete()
    return Response({"msg": "Comment Deleted successfully"})




@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def addReact(request, slug):
  reaction = request.data.get('reaction')
  project = Code.objects.get(slug=slug)
  existing_reaction = Reaction.objects.filter(author=request.user, project=project).first()
  if existing_reaction and  reaction == existing_reaction.reaction:
    existing_reaction.delete()
    return Response({'msg':'reaction deleted'})
  if existing_reaction:
    existing_reaction.reaction = reaction
    existing_reaction.save()
    return Response({'msg':'reaction added', 'reaction_status':True})
  created_react = Reaction.objects.create(author=request.user, reaction=reaction, project=project)
  return Response({'msg':'reaction added', 'reaction_status':True})
  



@api_view(['GET'])
def getReacts(request, slug):
  project= Code.objects.filter(slug=slug).first()
  if (not project):
    return Response({'msg':'project not found'})
  reactions = {
    'like': len(Reaction.objects.filter(project=project, reaction='like')),
    'love': len(Reaction.objects.filter(project=project, reaction='love')),
    'dislike': len(Reaction.objects.filter(project=project, reaction='dislike')),
    'angry': len(Reaction.objects.filter(project=project, reaction='angry'))}
  return Response({'reactions':reactions})

  
class SendPara(APIView):
  def get(self, request, slug):
    para = Para.objects.filter(slug=slug).first()
    if not para:
      return Response({'msg':f' add text for this slug in admin : {slug}', 'state':'not_exist'})
    serializedPara = ParaSerializer(para)
    return Response({'text':serializedPara.data, 'state':'exist'})
   
@api_view(['get'])
def getUsername(request, id):
  user = User.objects.filter(id=id).first()
  if not user:
    return Response({"username":"Username Not Found"})
  return Response({"username":user.username})
  
  
