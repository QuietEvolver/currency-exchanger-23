export default class CurrencyExchangeService {  
  static async getCurrency(rain) {
    try {
      const response = await fetch(`https://api.simpleswap.io/get_currency?api_key=${process.env.API_KEY}&symbol=btcs`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      console.log(rain);
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}

