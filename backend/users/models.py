from django.db import models
from django.contrib.auth.models import User


class UserLLMKey(models.Model):
    PROVIDER_CHOICES = [
        ("openai", "OpenAI"),
        ("gemini", "Gemini"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=20, choices=PROVIDER_CHOICES)
    encrypted_api_key = models.TextField()

    class Meta:
        unique_together = ("user", "provider")

    def __str__(self):
        return f"{self.user.username} - {self.provider}"


class UserGitHubToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    encrypted_token = models.TextField()

    def __str__(self):
        return self.user.username