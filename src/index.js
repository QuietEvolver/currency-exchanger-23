import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GifApiCall from './js/giphy.js';
import WeatherReport from './js/weather.js';

// Business Logic

function getAPIData(city) {
  WeatherReport.getWeather(city)
    .then (function(weatherResponse){
      if(weatherResponse instanceof Error) {
        const errorMessage = `there was problem accessing the weather data from OpenWeather API for ${city}: ${weatherResponse.message}`;
        throw new Error (errorMessage);
      }
      const description = weatherResponse.weather[0].description;
      printWeather(description, city);
      return GifApiCall.getGif(city);
    })
    .then(function(giphyResponse) {
      if (giphyResponse instanceof Error) {
        const errorMessage = `there was a problem accessing the gif data from Giphy API: ${giphyResponse.message}.`;
        throw new Error(errorMessage);
      }
      displayGif(giphyResponse, city);
    })
    .catch(function(error) {
      printError(error);
    });

}

//displays the gif
function displayGif(response, city) {
  const url = response.data[0].images.downsized.url;
  const img = document.createElement("img");
  img.src = url;
  img.alt = `${city} weather`;
  document.querySelector("#gif").append(img);
}

// has the message it prints to the DOM
function printWeather(description, city) {
  document.querySelector('#weather-description').innerText = `The weather in ${city} is ${description}.`;
}

function printError(error) {
  document.querySelector('#error').innerText = error;
}

//clear previous results.
function clearResults() {
  document.querySelector("#gif").innerText = null;
  document.querySelector('#error').innerText = null;
  document.querySelector('#weather-description').innerText = null;
}
function userInputForm(event) {
  event.preventDefault();
  clearResults();
  const city = document.querySelector('#user-input').value;
  document.querySelector('#user-input').value = null;
  // we update the name of the function that makes the API call
  getAPIData(city);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", userInputForm);
});