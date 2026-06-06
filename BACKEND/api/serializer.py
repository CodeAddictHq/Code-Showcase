from rest_framework import serializers
from .models import Code, Reaction, Para
from users.models import Comment
class CodeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Code
    fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'
    )
    author_id = serializers.CharField(source='author.id', read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'author', 'project', 'msg', 'author_id']
  


class ReactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Reaction
    fields = '__all__'


class ParaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Para
    fields = '__all__'