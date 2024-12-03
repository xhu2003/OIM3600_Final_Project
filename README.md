# OIM3600_Final_Project
 This is the repo of final project by Carina Hu & Annie Zhang


# Weather Travel Assistant

## 1. Project Overview
The Weather Travel Assistant is a dynamic web application designed to enhance travel planning by combining real-time weather data with AI-generated recommendations. When users input a city name, the application provides current weather conditions and generates contextually relevant suggestions for places to visit, what to pack, and activities to enjoy based on the weather. This integration of weather data and AI creates a smart travel planning tool that helps users make weather-appropriate decisions for their destinations.

Key Features:
- Real-time weather information display
- AI-powered travel recommendations
- Clean, intuitive user interface
- Mobile-responsive design
- Share functionality for travel tips

## 2. Usage Guidelines
### How to Use the Application:
1. **Search for a City**:
   - Enter any city name in the search box
   - Click the search icon or press Enter

2. **View Weather Information**:
   Display includes:
   - Current temperature in Celsius
   - Weather conditions (sunny, cloudy, rainy, etc.)
   - Humidity percentage
   - Wind speed in meters per second

3. **Explore Recommendations**:
   The app provides three categories of AI-generated suggestions:
   - Places to Visit: Local attractions suitable for current weather
   - What to Bring: Weather-appropriate clothing and items
   - Activities: Suggested things to do based on conditions

4. **Share Features**:
   - Use the Share button to copy recommendations
   - Share trip planning details with others

## 3. Dependencies
### Backend Requirements
- **Python 3.8+**
- **FastAPI Framework**: High-performance web framework
- **Uvicorn**: ASGI server implementation
- **python-dotenv**: Environment variable management
- **httpx**: Async HTTP client for API requests
- **OpenAI**: AI integration for recommendations
- **Jinja2**: Template engine for rendering HTML

### Frontend Technologies
- **HTML5**
- **CSS3**: Custom styling and responsive design
- **JavaScript**: Client-side interactivity
- **Font Awesome 6.0**: Icon library

### External APIs
- **OpenWeather API**: Provides real-time weather data
- **OpenAI API**: Powers the recommendation system

## 4. Project Structure
```
project/
├── app/
│   ├── __init__.py
│   └── main.py          # Core application logic and API routes
├── static/
│   ├── css/
│   │   └── styles.css   # Application styling and themes
│   └── js/
│       └── main.js      # Frontend interactivity and share functionality
├── templates/
│   ├── base.html        # Base template with common elements
│   └── index.html       # Main application interface
├── .env                 # API keys and configuration
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

### Key Components:
- **main.py**: Handles API integration, weather data processing, and AI recommendations
- **index.html**: User interface with responsive design
- **styles.css**: Custom styling for weather display and recommendations
- **main.js**: Manages user interactions and share functionality

## 5. Collaboration Information
Individual project for OIM3600 Final Project

## 6. Acknowledgments
- [OpenWeather API](https://openweathermap.org/api) for comprehensive weather data
- [OpenAI API](https://openai.com/) for intelligent travel recommendations
- [FastAPI](https://fastapi.tiangolo.com/) for efficient backend framework
- [Font Awesome](https://fontawesome.com/) for UI icons
- Professor and teaching staff of OIM3600 for guidance and support

## Setup Instructions
1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install fastapi uvicorn python-dotenv httpx openai jinja2
   ```
4. Create a `.env` file with your API keys:
   ```
   OPENWEATHER_API_KEY=your_key_here
   OPENAI_API_KEY=your_key_here
   ```
5. Run the application:
   ```
   uvicorn app.main:app --reload
   ```
6. Access the application at `http://127.0.0.1:8000`

## Author
[Your Name]

## License
This project is created for educational purposes as part of the OIM3600 course at Babson College.

## Note
The application requires valid API keys for both OpenWeather and OpenAI services to function properly. Users must obtain their own API keys from the respective services.

7. Reflection
Reflect on the project experience, focusing on both the process and learning perspectives. Consider what went well, challenges faced, and how this experience can benefit you in future projects. While the reflection can cover any aspects meaningful to you, feel free to draw insights from areas such as project planning, problem-solving, or using GenAI tools like ChatGPT.

Working on this project has been a great learning experience for us. While we had some wins, we also faced a fair share of challenges. Along the way, we learned a lot about problem-solving, collaboration, and even how to make better use of GenAI tools.

One thing that worked out well was our persistence. Even when we hit roadblocks, we kept pushing through and used AI to guide us when we got stuck. It was really helpful for outlining files and figuring out some tricky errors. By the end, we were able to get everything working and learned a lot in the process. Some of the challenges we faced for example, In main.py, we had trouble with how we assigned the WeatherAPI to the client. The API wouldn’t retrieve the data, and it took a while to figure out why. By looking for errors in the developer tool page, we were able to identify the error and debug with the help of AI. Eventually, we realized it was because of the way we named things.The two API was both named Client, which caused the initial error. Once we renamed it, things started to work. Additionally, We also ran into issues when trying to link the style files to main.py. For some reason, the styles wouldn’t show up properly, or they didn’t look the way we wanted. This was frustrating, but after some trial and error, we managed to fix it. 

Some of our key takeaways is that while ChatGPT helped us a lot, we noticed that it’s not always easy to understand the suggestions if you don’t fully understand the code. Sometimes, we ended up feeling more lost because we weren’t sure what the AI was doing. It’s great when you have enough knowledge to guide it, but without that, it can make things trickier. Debugging is definitely not easy, but it’s part of the process. We learned that taking a step back and looking at everything more carefully really helps. Also, using clear and consistent naming for variables can save a lot of time. Collaboration was one of the biggest learning curves. Working together on a coding project isn’t always easy because we had to make sure we understood each other’s code. It took some effort, but it got better as we went along.