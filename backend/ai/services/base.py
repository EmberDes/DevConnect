class BaseLLMProvider:
    def analyze_repo(self, repo_url: str) -> str:
        raise NotImplementedError("Subclasses must implement this method")
    

    # def chat(self, messages: list[dict]) -> str:
    #     raise NotImplementedError("Subclasses must implement chat")