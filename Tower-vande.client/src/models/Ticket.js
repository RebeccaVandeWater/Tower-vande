import { TowerEvent } from "./TowerEvent.js"

export class Ticket {
  constructor(data) {
    this.id = data.id
    this.profile = data.profile
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.event = new TowerEvent(data.event)
  }
}