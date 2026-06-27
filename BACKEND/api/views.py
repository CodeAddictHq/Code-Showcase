from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import get_user_model
from .models import Code, Reaction, Para
from .serializer import CodeSerializer, CommentSerializer, ReactionSerializer, ParaSerializer
from users.models import Comment

User = get_user_model()

VALID_REACTIONS = {'like', 'love', 'dislike', 'angry'}


@api_view(['GET'])
def welCome(request):
    return Response({'msg': 'Page not found'})


@api_view(['GET'])
def notFound(request):
    return Response({'msg': 'Hihi humen being'})


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
        project = Code.objects.filter(slug=slug).first()
        if not project:
            return Response({'msg': 'Project doesnt exists'}, status=404)
        projectData = CodeSerializer(project)
        reactions = {
            r: Reaction.objects.filter(project=project, reaction=r).count()
            for r in VALID_REACTIONS
        }
        return Response({'project': projectData.data, 'reactions': reactions})


class ProjectComments(APIView):
    def get(self, request, slug):
        project = Code.objects.filter(slug=slug).first()
        if not project:
            return Response({'msg': 'project doesnt exists'}, status=404)
        comments = Comment.objects.filter(project=project).order_by('-id')
        paginator = PageNumberPagination()
        page_size = request.query_params.get('page_size')
        paginator.page_size = int(page_size) if page_size else 10
        resultsObj = paginator.paginate_queryset(comments, request)
        resultsCom = CommentSerializer(resultsObj, many=True)
        return paginator.get_paginated_response(resultsCom.data)


class ProjectCommentsAdd(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        project = Code.objects.filter(slug=slug).first()
        if not project:
            return Response({'msg': 'Code doesnt exists', 'comment_status': False}, status=404)
        msg = request.data.get('comment')
        if not msg:
            return Response({'msg': 'Empty comment isnt accepted', 'comment_status': False}, status=400)
        Comment.objects.create(author=request.user, project=project, msg=msg)
        return Response({'msg': 'Comment added successfully', 'comment_status': True})


class ProjectCommentsEdit(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug, id):
        comment = Comment.objects.filter(id=id).first()
        if not comment:
            return Response({'msg': 'Comment doesnt exists'}, status=404)
        if comment.author != request.user:
            return Response({'msg': "others comment cant be updated"}, status=403)
        newmsg = request.data.get('comment')
        if not newmsg:
            return Response({'msg': 'Empty comment isnt accepted', 'comment_status': False}, status=400)
        comment.msg = newmsg
        comment.save()
        return Response({'msg': 'Comment Updated successfully', 'comment_status': True})


@api_view(['GET'])
def commentGet(request, slug, id):
    comment = Comment.objects.filter(id=id).first()
    if not comment:
        return Response({'msg': 'Comment doesnt exists', 'comment_status': False}, status=404)
    serializedData = CommentSerializer(comment)
    return Response({'data': serializedData.data, 'comment_status': True})


class ProjectCommentsDelete(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug, id):
        comment = Comment.objects.filter(id=id).first()
        if not comment:
            return Response({'msg': 'Comment not found'}, status=404)
        if comment.author != request.user:
            return Response({'msg': 'others comment cant be deleted'}, status=403)
        comment.delete()
        return Response({'msg': 'Comment Deleted successfully'})


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def addReact(request, slug):
    reaction = request.data.get('reaction')
    if reaction not in VALID_REACTIONS:
        return Response({'msg': 'Invalid reaction type', 'reaction_status': False}, status=400)

    project = Code.objects.filter(slug=slug).first()
    if not project:
        return Response({'msg': 'project not found'}, status=404)

    existing_reaction = Reaction.objects.filter(author=request.user, project=project).first()
    if existing_reaction and reaction == existing_reaction.reaction:
        existing_reaction.delete()
        return Response({'msg': 'reaction deleted', 'reaction_status': False})
    if existing_reaction:
        existing_reaction.reaction = reaction
        existing_reaction.save()
        return Response({'msg': 'reaction added', 'reaction_status': True})

    Reaction.objects.create(author=request.user, reaction=reaction, project=project)
    return Response({'msg': 'reaction added', 'reaction_status': True})


@api_view(['GET'])
def getReacts(request, slug):
    project = Code.objects.filter(slug=slug).first()
    if not project:
        return Response({'msg': 'project not found'}, status=404)
    reactions = {
        r: Reaction.objects.filter(project=project, reaction=r).count()
        for r in VALID_REACTIONS
    }
    return Response({'reactions': reactions})


class SendPara(APIView):
    def get(self, request, slug):
        para = Para.objects.filter(slug=slug).first()
        if not para:
            return Response({'msg': f'add text for this slug in admin : {slug}', 'state': 'not_exist'})
        serializedPara = ParaSerializer(para)
        return Response({'text': serializedPara.data, 'state': 'exist'})


@api_view(['GET'])
def getUsername(request, id):
    user = User.objects.filter(id=id).first()
    if not user:
        return Response({'username': 'Username Not Found'}, status=404)
    return Response({'username': user.username})