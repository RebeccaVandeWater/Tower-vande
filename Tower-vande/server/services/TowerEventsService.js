import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
  async getAllEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('ticketCount')

    return towerEvents
  }

  async getEventById(eventId) {
    const towerEvent = (await dbContext.TowerEvents.findById(eventId)).populate('ticketCount')

    return towerEvent
  }
  async createEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)

    await towerEvent.populate('ticketCount')

    return towerEvent
  }

  async editEvent(eventData, eventId, userId) {
    const originalEvent = await this.getEventById(eventId)

    if (originalEvent.creatorId != userId) {
      throw new Forbidden(`You are not the owner of ${originalEvent.name}. You may not edit this event.`)
    }

    if (originalEvent.isCanceled == true) {
      throw new BadRequest(`${originalEvent.name} has been canceled. You may not edit this event.`)
    }

    originalEvent.name = eventData.name || originalEvent.name
    originalEvent.description = eventData.description || originalEvent.description
    originalEvent.coverImg = eventData.coverImg || originalEvent.coverImg
    originalEvent.location = eventData.location || originalEvent.location
    originalEvent.capacity = eventData.capacity || originalEvent.capacity
    originalEvent.startDate = eventData.startDate || originalEvent.startDate
    originalEvent.type = eventData.type || originalEvent.type

    await originalEvent.save()

    return originalEvent
  }

  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)

    if (eventToCancel.creatorId != userId) {
      throw new Forbidden(`You are not the owner of ${eventToCancel.name}. You may not cancel this event.`)
    }

    eventToCancel.isCanceled = true

    await eventToCancel.save()

    return eventToCancel
  }

}

export const towerEventsService = new TowerEventsService