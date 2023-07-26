export class Ticket {
  constructor(data) {
    this.id = data.id
    this.profile = data.profile
    this.accountId = data.accountId
    this.eventId = data.eventId
  }
}