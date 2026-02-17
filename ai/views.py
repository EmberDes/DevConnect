from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from repositories.models import Repository


class RepositoryAnalyzeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            repo = Repository.objects.get(pk=pk, owner=request.user)
        except Repository.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        return Response({
            "repository": repo.name,
            "analysis": "AI analysis placeholder — will integrate LLM next."
        })