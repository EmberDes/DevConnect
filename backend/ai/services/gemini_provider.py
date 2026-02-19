from google import genai
from .base import BaseLLMProvider


class GeminiProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def analyze_repo(self, repo_url: str) -> str:
        prompt = f"""
        You are a senior software architect.

        Analyze this GitHub repository:
        {repo_url}

        Provide:
        - Architecture improvements
        - Performance suggestions
        - Code quality improvements
        - Security concerns
        - Scalability advice

        in finite and well quoted stuctured 5 points such that u give disnict and valuable knowledge.

        """

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        return response.text

    def chat(self, messages):
        formatted_messages = []

        for msg in messages:
            formatted_messages.append({
                "role": msg["role"],
                "parts": [{"text": msg["content"]}]
            })


        response = self.client.models.generate_content(
            model="gemini-1.5-flash",
            contents=messages
        )
        return response.text