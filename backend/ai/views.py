from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from users.models import UserLLMKey 
from ai.models import ChatSession , ChatMessage
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


        session = ChatSession.objects.create(
                    user=request.user,
                    repo_url=repo_url,
                    provider=provider_name
                )
        ChatMessage.objects.create(
                session=session,
                role="system",
                content=f"You are assisting with repository: {repo_url}. Stay focused on this project."
            )
        ChatMessage.objects.create(
            session=session,
            role="assistant",
            content=analysis
        )

        return Response({
            "provider": provider_name,
            "analysis": analysis,
            "session_id":session.id
        })


class GetChatSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, session_id):
        session = ChatSession.objects.get(id=session_id, user=request.user)

        messages = ChatMessage.objects.filter(
            session=session
        ).order_by("created_at")

        return Response({
            "repo_url": session.repo_url,
            "messages": [
                {
                    "role": m.role,
                    "content": m.content
                }
                for m in messages
            ]
        })
    
class ChatWithRepoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session_id = request.data.get("session_id")
        message = request.data.get("message")

        if not session_id or not message:
            return Response({"error": "Missing data"}, status=400)

        try:
            session = ChatSession.objects.get(
                id=int(session_id),
                user=request.user
            )
        except (ValueError, ChatSession.DoesNotExist):
            return Response({"error": "Invalid session"}, status=400)

        # Save user message
        ChatMessage.objects.create(
            session=session,
            role="user",
            content=message
        )

        history = ChatMessage.objects.filter(
            session=session
        ).order_by("created_at")

        messages = [
            {"role": m.role, "content": m.content}
            for m in history
            if m.role != "system"
        ]

        key_obj = UserLLMKey.objects.get(
            user=request.user,
            provider=session.provider
        )

        api_key = decrypt_value(key_obj.encrypted_api_key)
        provider = get_llm_provider(session.provider, api_key)

        response_text = provider.chat(messages)

        ChatMessage.objects.create(
            session=session,
            role="assistant",
            content=response_text
        )

        return Response({
            "response": response_text
        })