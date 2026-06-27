from django.db import models
from django.contrib.auth.models import User


class Code(models.Model):
  title = models.CharField(max_length=50, null=True)
  code = models.TextField(null=True)
  detail = models.TextField(blank=True, null=True)
  CATS = [
    ('py', 'Python'),
    ('js', 'JavaScript'),
    ('hc', 'Html&Css'),
    ('ot', 'Others'),
    ]
  cat = models.CharField(max_length=2, choices=CATS, null=True)
  slug = models.SlugField(unique=True, null=True)
  likes = models.IntegerField(null=True)
  def __str__(self):
    return self.title
  
    
    
    
    
class Reaction(models.Model):
  Reacts = [
    ('like', 'Like'),
    ('love', 'Love'),
    ('dislike', 'Dislike'),
    ('angry', 'Angry'),
    ]
  project = models.ForeignKey(Code, on_delete=models.CASCADE, null=True, blank=True)
  author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
  reaction = models.CharField(max_length=10, choices=Reacts, null=True, blank=True)
  def __str__(self):
    return self.author.username
  
  
  
class Para(models.Model):
  slug = models.SlugField()
  body = models.TextField()
  def __str__(self):
    return self.slug