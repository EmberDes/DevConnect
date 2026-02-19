from .openai_provider import OpenAIProvider
from .gemini_provider import GeminiProvider


def get_llm_provider(provider_name: str, api_key: str):
    if provider_name == "openai":
        return OpenAIProvider(api_key)

    elif provider_name == "gemini":
        return GeminiProvider(api_key)

    else:
        raise ValueError("Unsupported LLM provider")