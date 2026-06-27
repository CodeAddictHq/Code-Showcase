from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Para
from .serializer import ParaSerializer
    
 
class SendPara(APIView):
  def get(self, request, slug):
    para = Para.objects.filter(slug=slug).first()
    if not para:
      return Response({'msg':'Data will be added soon'})
    serializedPara = ParaSerializer(para)
    return Response({'text':serializedPara.data})
 


