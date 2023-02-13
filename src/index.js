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
  const currentRates = req.conversion_rates; //.events[0].name;
  console.log("current Rates: ", currentRates);
  const radioValue = document.querySelector("input[name=rate]:checked").value;
  console.log("current radioValue: ", radioValue);

  for (const [key, value] of Object.entries(currentRates)) {
    console.log(`Display() ${key}: ${value}`);
  }
  console.log("current Rates[USD]: ", currentRates["USD"]);
  let inputUSDmult = req.conversion_rates["USD"] * res;
  let inputAEDmult = req.conversion_rates["AED"] * res;
  let inputBAMmult = req.conversion_rates["BAM"] * res;
  let inputCADmult = req.conversion_rates["CAD"] * res;
  let inputDJFmult = req.conversion_rates["DJF"] * res;
  let inputEGPmult = req.conversion_rates["EGP"] * res;
  console.log("jsonifiedResponse* resUSD, AED, BAM, CAD, DJF, EGP : ", inputUSDmult, inputAEDmult, inputBAMmult, inputCADmult, inputDJFmult, inputEGPmult);
  
  // if 
  
  console.log("res aka userInput: ", res);

  // add += to add each [i] of loop
  document.querySelector("#currency").innerText += `\n Exchange rates in $${res} USD are equivalent to (radioSelect): ${(req.conversion_rates[radioValue] * res).toFixed(2)}  ${radioValue}.`;
}

function printError(error) {
  document.querySelector('#error').innerText = error;
}

//clear previous results.
function clearResults() {
  document.querySelector("#currency").innerText = null;
  document.querySelector('#error').innerText = null;
}
function formHandler(event) {
  event.preventDefault();
  clearResults();
  const usDollar = parseInt(document.querySelector('#user-input').value);
  // const radioValue = document.querySelectorAll("input[name=rate]:checked");
  const radioValue = document.querySelector("input[name=rate]:checked").value;
  console.log("UserInput: usDollar: ", usDollar);
  console.log("UserSelect: radioValue: ", radioValue);
  document.querySelector('#user-input').value = 0;

  // const form = document.querySelector("form");
  // const log = document.querySelector("#log");

  // const data = new FormData(form);
  // //radio.rate  // Add each size
  // // let value = this.rate; 
  // for (const [key, value] of data) {
  //   if (key === "size") {
  //     rate = value;
  //   }
  //   // let msg = "Choose an option";
  //   switch(rate){
  //   case("AED"): 
  //     this.rate = "AED";
  //     // ratePrice = currencyResponse.conversion_rates["AED"];
  //     return ratePrice;
  //   case("BAM"): 
  //     this.rate = "BAM";
  //     // ratePrice = currencyResponse.conversion_rates["BAM"];
  //     return ratePrice;
  //   case("CAD"):
  //     this.rate = "CAD";
  //     // ratePrice = currencyResponse.conversion_rates["CAD"];
  //     return ratePrice;
  //   case("DJF"): 
  //     this.rate = "DJF";
  //     // ratePrice = currencyResponse.conversion_rates["DJF"];
  //     return ratePrice;
  //   case("EGP"):
  //     this.rate = "EGP";
  //     // ratePrice = currencyResponse.conversion_rates["EGP"];
  //     return ratePrice;
  //   default: 
  //     // TODO: Update log --> DOM to return a notification.
  //     console.log("Choose a currency OR currency in question doesn't exist.");
  //     // output.innerHTML = msg;  // webAPI: MessageChannel; 
  //     console.log("entry(ies) ", output);
  //     event.preventDefault();
  //   }
  //   log.innerText = output;
  // }

  // we update the name of the function that makes the API call
  // findRate(usDollar);
  getAPIData(usDollar);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", formHandler);
});