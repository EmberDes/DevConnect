from django.db import models
from django.contrib.auth.models import User


class ChatSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    repo_url = models.TextField()
    provider = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)


class ChatMessage(models.Model):
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE)
    role = models.CharField(max_length=20)  # system, user, assistant
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)