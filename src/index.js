import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './services/currency.js';

function getAPIData(userInput) {
  CurrencyExchangeService.getCurrency(userInput)
    .then(function(currencyResponse) {
      if (currencyResponse instanceof Error) {
        const errorMessage = `there was a problem accessing the data from currency exchange request: ${currencyResponse.message}.`;
        throw new Error(errorMessage);
      }
      displayCurrencies(currencyResponse, userInput);
    })
    .catch(function(error) {
      printError(error);
    });
}

function displayCurrencies(req, res){
  const radioValue = document.querySelector("input[name=rate]:checked").value;

  document.querySelector("#currency").innerText += `\n Exchange rates in $${res} USD are equivalent to: ${(req.conversion_rates[radioValue] * res).toFixed(2)}  ${radioValue}.`;
}

function printError(error) {
  document.querySelector('#error').innerText = error;
}

function clearResults() {
  document.querySelector("#currency").innerText = null;
  document.querySelector('#error').innerText = null;
}

function formHandler(event) {
  event.preventDefault();
  clearResults();
  const usDollar = parseInt(document.querySelector('#user-input').value);
  document.querySelector('#user-input').value = 0;

  getAPIData(usDollar);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", formHandler);
});