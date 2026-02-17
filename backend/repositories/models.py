from django.db import models
from django.contrib.auth.models import User


class Repository(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE , related_name='repositories')
    
    name = models.CharField(max_length=255, unique=True)
    github_url = models.URLField(unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name