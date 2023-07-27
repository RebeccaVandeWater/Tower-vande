import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
  async getEvents() {
    const res = await api.get('api/events')

    logger.log('[GOT EVENTS]', res.data)
    AppState.towerEvents = res.data.map(pojo => new TowerEvent(pojo))
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)

    logger.log('[GOT EVENT BY ID]', res.data)

    AppState.selectedEvent = new TowerEvent(res.data)
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)

    logger.log('[CREATED EVENT]', res.data)

    const towerEvent = new TowerEvent(res.data)

    AppState.myEvents.push(towerEvent)

    return towerEvent
  }

  async editEvent(eventData, eventId) {
    const res = await api.put(`api/events/${eventId}`, eventData)

    logger.log('[EDITED EVENT]', res.data)

    const editedEvent = new TowerEvent(res.data)

    AppState.selectedEvent = editedEvent
  }

  async removeEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)

    logger.log('[CANCELLED EVENT]', res.data)
  }

}

export const towerEventsService = new TowerEventsService