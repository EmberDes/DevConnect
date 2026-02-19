from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from users.models import UserLLMKey
from core.encryption import decrypt_value
from openai import OpenAI
from ai.services.factory import get_llm_provider


class AnalyzeRepoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        repo_url = request.data.get("repo_url")
        provider_name = request.data.get("provider")  

        if not repo_url or not provider_name:
            return Response({"error": "repo_url and provider required"}, status=400)

        key_obj = UserLLMKey.objects.get(user=request.user,
                                      provider = provider_name)

        

        api_key = decrypt_value(key_obj.encrypted_api_key)

        provider = get_llm_provider(provider_name, api_key)

        analysis = provider.analyze_repo(repo_url)

        return Response({
            "provider": provider_name,
            "analysis": analysis
        })