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
// function getCurrency(){
//   let responseDoc =  CurrencyExchangeService.getCurrency();
//     responseDoc.then(function(rate){
//       displayCurrencies(rate);
//     }, function(error){
//       printError(error);
//     });
//   }

// currency fxn for latest rates
function displayCurrencies(req, res){ //
  // const currentRates = req.conversion_rates;
  // // console.log("current Rates: ", currentRates);

  // let inputUSDmult = req.conversion_rates["USD"] * res;
  // console.log("Outside for DispCurr(): jsonifiedResponse * resUSD: ", inputUSDmult);
  // for (const [key, value] of Object.entries(currentRates)) {
  //   let usdMultiplier = req.conversion_rates["USD"] * res;
  //   console.log("Inside for DispCurr(): jsonifiedResponse * resUSD: ", usdMultiplier);
  //   console.log("${value}", value);
  //   console.log("${key}", key);
  //   console.log(`Display() ${key}: ${value}`);
  //   // if (Object.keys(key==="USD")){
  //   //   console.log(`pinned ${key==="USD"}: ${value}`);
  //   // }
  //   if (Object.keys(key==="AED")){
  //     let ret =  value * usdMultiplier;
  //     console.log(`pinned ${key==="AED"}: ${value}`);
  //     console.log("ret", ret);
  //     return ret;
  //   }
  // }
  // console.log("current Rates[USD]: ", currentRates["USD"]);
  // console.log("res aka userInput: ", res);
  
  const usDollar = parseInt(document.querySelector('#user-input').value);
  const radioValue = document.querySelectorAll("input[name=rate]:checked");
  // Getting just the conversion rates list from the response
  const conversionRateList = CurrencyExchangeService.getCurrency().conversion_rates; // responseDoc
  console.log('conversionRateList', conversionRateList);
  console.log("UserInput: usDollar: ", usDollar);
  console.log("userSelection: ", radioValue);

  
  document.querySelector("#currency").innerText += `\n Exchange rates in $${usDollar} USD are equivalent to (radioSelect):req ${req} res ${res}`;//;

  document.querySelector('#user-input').value = null;

  // // With await we are now getting the api response here. (errhandle)
  // let responseDoc = await CurrencyExchangeService.getCurrency();
  // // console.log('responseDoc', responseDoc);

  // Getting just the currencyRate from the country entered in the form
  const currencyRate = conversionRateList[radioValue];
  console.log('rate', currencyRate);

  // Multiply the currencyRate by the number of dollars entered
  const converted = currencyRate * usDollar;
  console.log('converted', converted);

  // Round the amount (using EPSILON to round up if it is a .005, etc)
  const roundedValue = Math.round((converted + Number.EPSILON) * 100) / 100;
  console.log('roundedValue', roundedValue);

  // for (const [key, value] of Object.entries(radioValue)) {
  //   if(radioValue === key){
  //     console.log(" key, value, radioValue", key, value, radioValue);
  //     return value;
  //   }
  //   console.log(`${key}: ${value}`);
  // }
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
  // const usDollar = parseInt(document.querySelector('#user-input').value);
  // const radioValue = document.querySelectorAll("input[name=rate]:checked");
  // // Getting just the conversion rates list from the response
  // const conversionRateList = responseDoc.conversion_rates;
  // console.log('conversionRateList', conversionRateList);
  getAPIData();
  
  // console.log("UserInput: usDollar: ", usDollar);
  // console.log("userSelection: ", radioValue);


  
  // const formUser = event.target;
  
  // const checkedInput = [...formUser.elements]
  //   .filter((input) => input.checked) // Here you filter the inputs to get the checked value
  //   .map((input) => input.checked); // here you get the checked input value
  
  // console.log("checkedInput", checkedInput);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", formHandler);
});