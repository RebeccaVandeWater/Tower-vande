import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')

    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .get('/:eventId/comments', this.getCommentsByEventId)

      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async getAllEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAllEvents()

      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId

      const towerEvent = await towerEventsService.getEventById(eventId)

      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId

      const tickets = await ticketsService.getTicketsByEventId(eventId)

      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId

      const comments = await commentsService.getCommentsByEventId(eventId)

      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      const eventData = req.body

      eventData.creatorId = req.userInfo.id

      const towerEvent = await towerEventsService.createEvent(eventData)

      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const eventData = req.body

      const eventId = req.params.eventId

      const userId = req.userInfo.id

      const editedEvent = await towerEventsService.editEvent(eventData, eventId, userId)

      return res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId

      const userId = req.userInfo.id

      const canceledEvent = await towerEventsService.cancelEvent(eventId, userId)

      return res.send(canceledEvent)
    } catch (error) {
      next(error)
    }
  }


}