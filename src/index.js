import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './services/currency.js';

// Business Logic
// function getAPIData(city) {
//   CurrencyExchangeService.getCurrency(city)
//     .then(function(currencyResponse) {
//       if (currencyResponse instanceof Error) {
//         const errorMessage = `there was a problem accessing the data from currency exchange request: ${currencyResponse.message}.`;
//         throw new Error(errorMessage);
//       } // loops events
//       // for (let i = 0; i < 20; i++) {
//       //   let currentRates = currencyResponse.conversion_rates[i];// .events[i].name;
//       //   console.log(currentRates);
//       //   // TODO: if/else
//       //   displayCurrencies(currentRates, city);
//       // } // declared constant outside for var access
//       const currentRates = currencyResponse.conversion_rates[0]; //.events[0].name;
//       console.log("current Rates: ", currentRates);
//       console.log("current Rates[USD]: ", currentRates[
//       "USD"]);
//       console.log("city: ", city);
//       displayCurrencies(currencyResponse, city);
//     })
//     .catch(function(error) {
//       printError(error);
//     });
// }

// currency fxn for latest rates
function displayCurrencies(req, res){
  // add += to add each [i] of loop
  document.querySelector("#currency").innerText += `\n Exchange rates in $${res}USD, are ${req} `;

}

function printError(error) {
  document.querySelector('#error').innerText = error;
}

//clear previous results.
function clearResults() {
  document.querySelector("#currency").innerText = null;
  document.querySelector('#error').innerText = null;
}

async function userInputForm(event) {
  event.preventDefault();
  clearResults();
  const usDollar = parseInt(document.querySelector('#user-input').value);
  console.log("usDollar: ", usDollar);
  document.querySelector('#user-input').value = null;

  // REPLACE THIS WITH THE RADIO BUTTON VALUE FROM THE FORM
  // const radioValue = "AED" // Hard coded but replace this with the value from form
  const radioValue = document.querySelectorAll("input[name=rate]:checked");
  console.log("radioValue: ", radioValue);
  // We need to use await with async calls (not .then).
  // This function needs to be async in order for await to work inside it.
  // This is why I was so confused with the promises. The browser wasn't
  // updating and so I thought the await wasn't working!

  // With await we are now getting the api response here.
  const responseDoc = await CurrencyExchangeService.getCurrency();
  console.log('responseDoc', responseDoc)
  
  // Getting just the conversion rates list from the response
  const conversionRateList = responseDoc.conversion_rates;
  console.log('conversionRateList', conversionRateList);

  // Getting just the rate from the country entered in the form
  const rate = conversionRateList[radioValue];
  console.log('rate', rate);

  // Multiply the rate by the number of dollars entered
  const converted = rate * usDollar;
  console.log('converted', converted)

  // Round the amount (using EPSILON to round up if it is a .005, etc)
  const roundedValue = Math.round((converted + Number.EPSILON) * 100) / 100;
  console.log('roundedValue', roundedValue);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", userInputForm);
});