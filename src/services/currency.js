export default class CurrencyExchangeService {  
  static async getCurrency(usDollar) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      console.log("usDollar: ", usDollar);
      console.log("jsonifiedResponse: ", jsonifiedResponse);
      console.log("jsonifiedResponse: ", jsonifiedResponse.conversion_rates);
      console.log("jsonifiedResponse: ", jsonifiedResponse.conversion_rates["USD"]);
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
} 

