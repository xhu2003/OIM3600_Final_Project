from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import httpx
from dotenv import load_dotenv
import os
from openai import AsyncOpenAI

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Weather Travel Assistant")
templates = Jinja2Templates(directory="templates") # Initialize templates  
app.mount("/static", StaticFiles(directory="static"), name="static") # Mount static files directory 

# Get API keys from environment variables
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """
    Render the home page.
    """
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/get-weather")
async def get_weather(request: Request, city: str = Form(...)):
    """
    Get weather data and AI recommendations for a city.
    """
    try:
        # OpenWeather API call
        weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
        
        async with httpx.AsyncClient() as http_client:
            weather_response = await http_client.get(weather_url)
            weather_data = weather_response.json()

        if weather_response.status_code != 200:
            return templates.TemplateResponse(
                "index.html",
                {"request": request, "error": "City not found"}
            )

        # Extract relevant weather information
        weather_info = {
            "temperature": weather_data["main"]["temp"],
            "condition": weather_data["weather"][0]["main"],
            "humidity": weather_data["main"]["humidity"],
            "wind_speed": weather_data["wind"]["speed"]
        }

        # Get AI recommendations based on weather
        ai_prompt = f"""
        Given the following weather conditions for {city}:
        Temperature: {weather_info['temperature']}°C
        Weather: {weather_info['condition']}
        Humidity: {weather_info['humidity']}%
        Wind Speed: {weather_info['wind_speed']} m/s

       Please provide recommendations using exactly this format:

        1. Places to Visit:
        • [First place] - [brief description]
        • [Second place] - [brief description]
        • [Third place] - [brief description]

        2. What to Bring/Wear:
        • [First essential item]
        • [Second essential item]
        • [Third essential item]
        • [Fourth essential item]

        3. Suitable Activities:
        • [First recommended activity]
        • [Second recommended activity]
        • [Third recommended activity]

        Replace all text in brackets with actual recommendations based on the weather conditions.
        Make sure to keep the bullet points (•) at the start of each item.
        """

        ai_response = await openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": ai_prompt}]
        )

        recommendations = ai_response.choices[0].message.content

        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "city": city,
                "weather": weather_info,
                "recommendations": recommendations
            }
        )

    except Exception as e:
        return templates.TemplateResponse(
            "index.html",
            {"request": request, "error": str(e)}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)