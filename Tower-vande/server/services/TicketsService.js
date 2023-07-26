import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {
  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId })

      .populate({
        path: 'event',
        populate: {
          path: 'creator ticketCount'
        }
      })

    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')

    return tickets
  }
  async createTicket(ticketData) {

    const event = await towerEventsService.getEventById(ticketData.eventId)

    if (event.isCanceled == true) {
      throw new Forbidden(`${event.name} has been cancelled. You cannot create a ticket for a cancelled event.`)
    }

    const ticket = await dbContext.Tickets.create(ticketData)

    await ticket.populate('event profile', 'name picture')

    return ticket
  }

  async removeTicket(ticketId, userId) {
    const ticketToRemove = await dbContext.Tickets.findById(ticketId)

    if (!ticketToRemove) {
      throw new BadRequest('This ticket does not exist.')
    }

    if (ticketToRemove.accountId != userId) {
      throw new Forbidden('You are not the owner of this ticket. You may not remove a ticket that you do not own.')
    }

    await ticketToRemove.remove()

    return ticketToRemove
  }
}

export const ticketsService = new TicketsService