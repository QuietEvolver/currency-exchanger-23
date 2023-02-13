import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './services/currency.js';

// Business Logic
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

// currency fxn for latest rates
function displayCurrencies(req, res){
  const radioValue = document.querySelector("input[name=rate]:checked").value;

  // - loop through JSON Obj{k:v} for logging purposes 
  // TODO: could be useful for currency to currency evals
  // for (const [key, value] of Object.entries(currentRates)) {
  //   console.log(`Display() ${key}: ${value}`);
  // }
  
  // - i needed to 'see' the code in order to solve
  // console.log("current Rates[USD]: ", currentRates["USD"]);
  // let inputUSDmult = req.conversion_rates["USD"] * res;
  // let inputAEDmult = req.conversion_rates["AED"] * res;
  // let inputBAMmult = req.conversion_rates["BAM"] * res;
  // let inputCADmult = req.conversion_rates["CAD"] * res;
  // let inputDJFmult = req.conversion_rates["DJF"] * res;
  // let inputEGPmult = req.conversion_rates["EGP"] * res;
  // console.log("jsonifiedResponse* resUSD, AED, BAM, CAD, DJF, EGP : ", inputUSDmult, inputAEDmult, inputBAMmult, inputCADmult, inputDJFmult, inputEGPmult);

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
  // NodeList[]
  // const radioValue = document.querySelectorAll("input[name=rate]:checked"); 
  // Ind'l node[{}];
  // const radioValue = document.querySelector("input[name=rate]:checked").value; 
  document.querySelector('#user-input').value = 0;

  getAPIData(usDollar);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", formHandler);
});