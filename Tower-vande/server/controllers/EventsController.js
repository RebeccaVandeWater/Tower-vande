import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')

    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createEvent)
  }
  async createEvent(req, res, next) {
    try {
      const eventData = req.body

      eventData.creatorId = req.userInfo.id

      const event = await eventsService.createEvent(eventData)

      return res.send(event)
    } catch (error) {
      next(error)
    }
  }


}