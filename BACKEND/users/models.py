from django.db import models
from django.contrib.auth.models import User
from api.models import Code

class Comment(models.Model):
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  project = models.ForeignKey(Code, on_delete=models.CASCADE)
  msg = models.TextField()
  def __str__(self):
    return self.author.username
  
  
  
class Error(models.Model):
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=120)
  error = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True, null=True)
  def __str__(self):
    return self.title



  
