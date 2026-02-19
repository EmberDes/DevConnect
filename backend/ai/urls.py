from django.urls import path

from .views import AnalyzeRepoView , ChatWithRepoView , GetChatSessionView


urlpatterns = [
    path('analyze/', AnalyzeRepoView.as_view()),
    path('chat/', ChatWithRepoView.as_view()),
    path('chat/<int:session_id>/', GetChatSessionView.as_view())
]