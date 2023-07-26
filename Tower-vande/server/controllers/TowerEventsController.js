import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
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

      const towerEvent = await towerEventsService.createEvent(eventData)

      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }


}