import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService {
  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)

    logger.log('[GOT TICKETS FROM EVENT]', res.data)

    AppState.tickets = res.data.map(pojo => new Ticket(pojo))
  }
}

export const ticketsService = new TicketsService