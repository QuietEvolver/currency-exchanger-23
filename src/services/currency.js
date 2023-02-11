export default class CurrencyExchangeService {  
  static async getCurrency(usDollar) {
    try {
      const response = await fetch(`https://api.simpleswap.io/get_currency?api_key=${process.env.API_KEY}&symbol=btcs`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      console.log(usDollar);
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}

