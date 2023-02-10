import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './services/currency.js';

// Business Logic

function getAPIData(city) {
  CurrencyExchangeService.getWeather(city)
    .then(function(currencyResponse) {
      if (currencyResponse instanceof Error) {
        const errorMessage = `there was a problem accessing the ticket events data from currency exchange API: ${currencyResponse.message}.`;
        throw new Error(errorMessage);
      } // loops events
      for (let i = 0; i < 20; i++) {
        //let currentRates = currencyResponse.conversion_rates;// .events[i].name;
        console.log(currentRates);
          // TODO: if/else
        displayCurrencies(currentRates, city);
      } // declared constant outside for var access
      //const currentRates = currencyResponse.conversion_rates; //.events[0].name;
      displayCurrencies(currencyResponse, city);
    })
    .catch(function(error) {
      printError(error);
    });
}

// currency fxn for latest rates
function displayCurrencies(req, res){
  // add += to add each [i] of loop
  document.querySelector("#currency").innerText += `\n Exchange rates in ${res}, are ${req} `;

}

function printError(error) {
  document.querySelector('#error').innerText = error;
}

//clear previous results.
function clearResults() {
  document.querySelector("#currency").innerText = null;
  document.querySelector('#error').innerText = null;
}
function userInputForm(event) {
  event.preventDefault();
  clearResults();
  const usDollar = document.querySelector('#user-input').value;
  document.querySelector('#user-input').value = null;

  const form = document.querySelector("form");
  const log = document.querySelector("#log");

  const data = new FormData(form);
  //radio.rate  // Add each size
  let value = this.size; 
  for (const [key, value] of data) {
    if (key === "size") {
      size = value;
    }
    // let msg = "Choose an option";
    switch(size){
      case("small"): 
        this.size = "small";
        sizePrice = 5;
        return sizePrice;
      case("medium"): 
        this.size = "medium";
        sizePrice = 10;
        return sizePrice;
      case("large"):
        this.size = "large";
        sizePrice = 15;
        return sizePrice;
      default: 
      console.log("Choose a sz");
      // output.innerHTML = msg;  // webAPI: MessageChannel; 
    }
  }

  // we update the name of the function that makes the API call
  getAPIData(usDollar);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", userInputForm);
});