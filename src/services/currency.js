export default class CurrencyExchangeService {  
  static async getCurrency() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      console.log("jsonifiedResponse: ", jsonifiedResponse);
      console.log("jsonifiedResponse.conversion_rates: ", jsonifiedResponse.conversion_rates);
      console.log("jsonifiedResponse.[USD]: ", jsonifiedResponse.conversion_rates["USD"]);
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }

  static async getCurrent() {
    return new Promise ((resolve) => {
      const response = fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      const jsonifiedResponse = response.json();
      console.log('jsonifiedResponse', jsonifiedResponse)
      resolve(jsonifiedResponse);
    })
  }
}

