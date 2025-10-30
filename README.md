🌤️ Weather Now
Check real-time weather conditions and 7-day forecasts for any city.
📘 Overview

Weather Now is a React-based web application built for Jamie, an outdoor enthusiast who wants to check current weather conditions quickly and plan activities accordingly.

The app uses the Open-Meteo API to fetch live weather data, including temperature, humidity, visibility, pressure, and an extended 7-day forecast.

👤 User Persona

Name: Jamie
Occupation: Outdoor Enthusiast
Goal: Quickly check current and upcoming weather before planning outdoor activities such as hiking, cycling, or camping.

🚀 Features

✅ Instant City Search – Search weather data for any city worldwide using the built-in search bar.
✅ Real-Time Weather Data – Displays temperature, wind speed, humidity, visibility, and pressure.
✅ 7-Day Forecast – See upcoming weather trends (max/min temperature, icons, and conditions).
✅ Automatic Default City – Automatically shows weather for Hyderabad on load (you can change it).
✅ Dynamic Weather Icons & Descriptions – Displays emojis representing actual weather conditions.
✅ Responsive Design – Optimized layout for desktop and mobile devices.
✅ Smooth Loading State & Error Handling – Friendly messages if a city is not found or data fails to load.
✅ Modern UI with Ant Design – Clean and visually appealing interface using the Ant Design component library.

🧩 Tech Stack
Category	Technology
Frontend Framework	React (Hooks & Functional Components)
UI Library	Ant Design (antd)
Icons	Ant Design Icons
API	Open-Meteo API (Free & No Key Required)
Styling	Custom CSS + Inline Styling
Hosting	CodeSandbox / GitHub Pages (free deployment)
⚙️ Installation & Setup

Follow these steps to run the project locally:

1️⃣ Clone the Repository
git clone https://github.com/yourusername/weather-now.git
cd weather-now

2️⃣ Install Dependencies
npm install

3️⃣ Start the Development Server
npm start

4️⃣ Open in Browser

Go to:
👉 http://localhost:3000

🔗 API Reference
🌍 Geocoding API (to get latitude & longitude)
https://geocoding-api.open-meteo.com/v1/search?name={CITY_NAME}&count=1&language=en&format=json

🌦️ Weather Forecast API
https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,visibility,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto


Both endpoints are free to use and don’t require an API key.

🖼️ UI Highlights

Home View: Search bar + Current Weather Card

Forecast Section: 7 cards showing daily weather summaries

Error Handling: Alerts if city not found

Loading State: Spinner while fetching data

💡 How It Works

User enters a city name.

The app fetches its coordinates using the Geocoding API.

Using those coordinates, it calls Open-Meteo Forecast API to get live data.

The UI updates with current weather + 7-day forecast cards.

Data is refreshed each time a new city is searched.

🧠 Learning Outcomes

Using React hooks (useState, useEffect, useCallback) for state and side-effects.

Handling asynchronous API requests in React.

Managing loading and error states elegantly.

Implementing responsive UI using Ant Design grid system.

Working with real-world weather APIs and data formatting.

🎨 Future Enhancements

🔹 Add background images that match weather (e.g., sunny, rainy).
🔹 Integrate geolocation to auto-detect the user’s current city.
🔹 Support temperature unit toggle (°C / °F).
🔹 Add charts for temperature trends.
🔹 Provide night/day theme for accessibility.

🧑‍💻 Author

Developed by: Chandana Utla
Role: Frontend Developer / React Enthusiast
Contact: chandanautla101@gmail.com

GitHub: https://github.com/Chandana-utla/WeatherNow/
