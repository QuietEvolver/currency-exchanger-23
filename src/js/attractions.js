export default class TicketMasterApi {
  static async getTicket(city) {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${process.env.TICKETMASTER_API_KEY}`)
      const jsonApiReponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonApiReponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonApiReponse;
    } catch(error){
      return error;
    }
  }
}
