class BaseLLMProvider:
    def analyze_repo(self, repo_url: str) -> str:
        raise NotImplementedError("Subclasses must implement this method")