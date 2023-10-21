from sanic import Sanic
from sanic.response import json
import requests

app = Sanic("text_generator")

JOKE_API_URL = "https://v2.jokeapi.dev/joke/Any"
NEWS_API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY"  # Replace with your NewsAPI key


@app.route("/generate-text", methods=["POST"])
async def generate_text(request):
    context = request.json.get("context")
    topic = request.json.get("topic")
    # print("request", request)
    if context == "joke":
        if topic:
            f"{JOKE_API_URL}?contains={topic}"
        response = requests.get(f'{JOKE_API_URL}')
        data = response.json()
        
        
        if data['type'] == 'single':
            text = f"The joke is: {data['joke']}"
        else:
            text = f"The joke is: {data['setup']} - {data['delivery']}"

    elif context == "news":
        response = requests.get(NEWS_API_URL)
        data = response.json()
        article = data['articles'][0]  # Just taking the first article for simplicity
        text = f"The news is about: {article['title']}"

    else:
        return json({"error": "Invalid context"}, status=400)

    return json({"text": text})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, dev=True)
