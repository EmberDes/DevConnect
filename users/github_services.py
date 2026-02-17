import requests


def fetch_github_repositories(github_token):
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(
        "https://api.github.com/user/repos",
        headers=headers
    )

    if response.status_code != 200:
        print(response.status_code)
        print(response.text)
        return None

    return response.json()