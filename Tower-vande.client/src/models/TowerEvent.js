export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg || 'https://images.unsplash.com/photo-1545129139-1beb780cf337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    this.location = data.location
    this.capacity = data.capacity - data.ticketCount
    this.ticketCount = data.ticketCount
    this.startDate = new Date(data.startDate).toLocaleString()
    this.isCanceled = data.isCanceled
    this.type = data.type
  }
}