from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from repositories.models import Repository
from .github_services import fetch_github_repositories
from rest_framework import status 
from django.contrib.auth.models import User

from .models import UserLLMKey
from core.encryption import encrypt_value
# Create your views here.


class GitHubImportViews(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        github_token = request.data.get("github_token")
    
        if not github_token:
            return Response({"error":"Github Token Required"}, status=400)
        
        repos_data = fetch_github_repositories(github_token)


        if repos_data is None:
            return Response({"error":"Invalid Github Token"}, status=400)
        
        imported = []


        for repo in repos_data:
            obj, created = Repository.objects.get_or_create(
                owner=request.user,
                github_url=repo["html_url"],
                defaults={
                    "name": repo["name"],
                    "description": repo["description"] or ""
                }
            )

            if created :
                imported.append(obj.name)

            return Response({
                "imported_respositories": imported
            })
        
class RegisterView(APIView):
    
    permission_classes = [AllowAny]



    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Validate input
        if not username or not password:
            return Response(
                {"error": "Username and password required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if user exists
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user
        user = User.objects.create_user(
            username=username,
            password=password
        )

        return Response(
            {"message": "User created successfully"},
            status=status.HTTP_201_CREATED
        )
class SaveAPIKeysView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        provider = request.data.get("provider")
        api_key = request.data.get("api_key")
        github_token = request.data.get("github_token")

        if provider and api_key:
            encrypted_key = encrypt_value(api_key)

            UserLLMKey.objects.update_or_create(
                user=request.user,
                provider=provider,
                defaults={"encrypted_api_key": encrypted_key}
            )

        if github_token:
            encrypted_token = encrypt_value(github_token)

            UserGitHubToken.objects.update_or_create(
                user=request.user,
                defaults={"encrypted_token": encrypted_token}
            )

        return Response({"message": "Keys saved securely"})