import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class TicketsService {
  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)

    logger.log('[GOT TICKETS FROM EVENT]', res.data)
    AppState.tickets = res.data.map(pojo => new Ticket(pojo))
  }

  async getMyTickets() {
    try {
      const res = await api.get('account/tickets')

      logger.log('[GOT ACCOUNT TICKETS]', res.data)
      AppState.myTickets = res.data.map(pojo => new Ticket(pojo))
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async createTicket(ticketData) {

    const res = await api.post('api/tickets', ticketData)

    logger.log('[CREATED TICKET]', res.data)

    AppState.tickets.push(new Ticket(res.data))

    AppState.selectedEvent.capacity--
  }

  async removeTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)

    logger.log('[REMOVED TICKET]', res.data)

    AppState.tickets.filter(t => t.id != ticketId)

    AppState.selectedEvent.capacity++
  }
}

export const ticketsService = new TicketsService