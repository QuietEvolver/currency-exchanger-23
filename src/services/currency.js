export default class CurrencyExchangeService {  
  static async getCurrency(param) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      console.log("param: ", param);
      console.log("jsonifiedResponse: ", jsonifiedResponse);
      console.log("jsonifiedResponse.conversion_rates: ", jsonifiedResponse.conversion_rates);
      console.log("jsonifiedResponse conversion rates in USD: ", jsonifiedResponse.conversion_rates["USD"]);
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
} 

