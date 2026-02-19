from openai import OpenAI
from .base import BaseLLMProvider


class OpenAIProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)

    def analyze_repo(self, repo_url: str) -> str:
        prompt = f"Analyze this GitHub repo and give improvements: {repo_url}"

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a senior software architect."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.5,
        )

        return response.choices[0].message.content