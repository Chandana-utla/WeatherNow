import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button, Card, Spin, Alert, Space, Typography, Row, Col, Statistic } from 'antd';
import { SearchOutlined, CloudOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './App.css'

const { Title, Text } = Typography;
const { Search } = Input;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (searchCity) => {
    if (!searchCity) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData([]);

    try {
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1&language=en&format=json`
      );
      const geoData = await geocodingResponse.json();

      if (!geocodingResponse.ok || !geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please try again.');
      }

      const { latitude, longitude, name: cityName } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,visibility,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const data = await weatherResponse.json();

      if (!weatherResponse.ok) {
        throw new Error(data.reason || 'Failed to fetch weather data.');
      }

      const currentHour = new Date().getHours();
      setWeatherData({
        city: cityName,
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        weathercode: data.current_weather.weathercode,
        humidity: data.hourly.relative_humidity_2m[currentHour],
        visibility: data.hourly.visibility[currentHour],
        pressure: data.hourly.pressure_msl[currentHour],
      });

      const dailyForecasts = data.daily.time.slice(1, 8).map((time, index) => ({
        date: time,
        maxTemp: data.daily.temperature_2m_max[index + 1],
        minTemp: data.daily.temperature_2m_min[index + 1],
        weathercode: data.daily.weathercode[index + 1],
      }));
      setForecastData(dailyForecasts);

    } catch (err) {
      setError(err.message);
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather('Hyderabad');
  }, [fetchWeather]);

  const handleSearch = (value) => {
    fetchWeather(value || city);
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️';
    if (code > 0 && code < 3) return '⛅';
    if (code >= 3 && code < 48) return '☁️';
    if (code >= 48 && code < 56) return '🌫️';
    if (code >= 56 && code < 66) return '🌧️';
    if (code >= 66 && code < 70) return '☔';
    if (code >= 70 && code < 80) return '❄️';
    if (code >= 80 && code < 83) return '⛈️';
    if (code >= 83 && code < 86) return '🌨️';
    if (code >= 86 && code < 90) return '🌨️';
    if (code >= 90) return '⚡';
    return '☁️';
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear sky';
    if (code > 0 && code < 3) return 'Partly cloudy';
    if (code >= 3 && code < 48) return 'Cloudy';
    if (code >= 48 && code < 56) return 'Fog';
    if (code >= 56 && code < 66) return 'Drizzle';
    if (code >= 66 && code < 70) return 'Rain';
    if (code >= 70 && code < 80) return 'Snow';
    if (code >= 80 && code < 83) return 'Rain showers';
    if (code >= 83 && code < 86) return 'Snow showers';
    if (code >= 86 && code < 90) return 'Snow fall';
    if (code >= 90) return 'Thunderstorm';
    return 'N/A';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px 24px'}}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title style={{ fontWeight: 600, marginBottom: '8px', color: '#9c27b0', fontSize:'40px' }}>Weather</Title>
          <Text style={{ color: '#e91e63', fontSize: '20px' }}>Check current weather and forecast</Text>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto 48px' }}>
          <Search
            placeholder="Enter city name..."
            allowClear
            size="large"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
            style={{ borderRadius: '24px' }}
          />
        </div>

        {error && (
          <div style={{ maxWidth: '800px', margin: '0 auto 24px' }}>
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
            />
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <Spin size="large" tip="Loading weather data..." />
          </div>
        )}

        {weatherData && !loading && (
          <div style={{ marginBottom: '48px' }}>
            <Card 
              style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)',
                border: '2px solid linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)'
              }}
              bodyStyle={{ padding: '32px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ fontWeight: 600, marginBottom: '4px'}}>
                  {weatherData.city}
                </Title>
                <Text style={{ fontSize: '14px' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '72px', marginRight: '24px' }}>
                  {getWeatherIcon(weatherData.weathercode)}
                </div>
                <div>
                  <div style={{ fontSize: '64px', fontWeight: 600, lineHeight: 1}}>
                    {Math.round(weatherData.temperature)}°
                  </div>
                  <Text style={{ fontSize: '16px' }}>
                    {getWeatherDescription(weatherData.weathercode)}
                  </Text>
                </div>
              </div>

              <Row gutter={[16, 16]} style={{ paddingTop: '24px', borderTop: '1px solid rgba(46,125,50,0.2)' }}>
                <Col xs={12} sm={6}>
                  <Statistic 
                    title={<span style={{fontWeight: 500 }}>Wind</span>}
                    value={weatherData.windspeed} 
                    suffix="km/h"
                    valueStyle={{ fontSize: '18px', fontWeight: 600 }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Statistic 
                    title={<span style={{fontWeight: 500 }}>Humidity</span>}
                    value={weatherData.humidity} 
                    suffix="%"
                    valueStyle={{ fontSize: '18px', fontWeight: 600 }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Statistic 
                    title={<span style={{fontWeight: 500 }}>Visibility</span>}
                    value={(weatherData.visibility / 1000).toFixed(1)} 
                    suffix="km"
                    valueStyle={{ fontSize: '18px', fontWeight: 600 }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Statistic 
                    title={<span style={{ fontWeight: 500 }}>Pressure</span>}
                    value={weatherData.pressure} 
                    suffix="hPa"
                    valueStyle={{ fontSize: '18px', fontWeight: 600 }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        )}

        {forecastData.length > 0 && !loading && (
          <div>
            <Title level={3} style={{ textAlign: 'center', fontWeight: 600, marginBottom: '24px', color: '#1976d2' }}>
              7-Day Forecast
            </Title>
            <Row gutter={[16, 16]} justify="center">
              {forecastData.map((forecast, index) => (
                <Col xs={12} sm={8} md={6} lg={3} key={index}>
                  <Card 
                    hoverable
                    style={{ 
                      borderRadius: '12px', 
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)',
                      border: '2px solid linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)',
                      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
                    bodyStyle={{ padding: '20px' }}
                  >
                    <Text strong style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
                      {formatDate(forecast.date)}
                    </Text>
                    <div style={{ fontSize: '48px', margin: '12px 0' }}>
                      {getWeatherIcon(forecast.weathercode)}
                    </div>
                    <Text style={{ display: 'block', marginBottom: '12px', fontSize: '13px'}}>
                      {getWeatherDescription(forecast.weathercode)}
                    </Text>
                    <Space>
                      <Text strong style={{ fontSize: '18px', fontWeight: 600 }}>
                        {Math.round(forecast.maxTemp)}°
                      </Text>
                      <Text style={{ color: '#558b2f' }}>
                        {Math.round(forecast.minTemp)}°
                      </Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;