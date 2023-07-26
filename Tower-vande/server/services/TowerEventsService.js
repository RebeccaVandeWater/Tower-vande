import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
  async createEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)

    await towerEvent.populate('ticketCount')

    return towerEvent
  }

}

export const towerEventsService = new TowerEventsService