export default class WeatherReport {  
  static async getWeather(rain) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${rain}&appid=${process.env.WEATHER_API_KEY}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}

