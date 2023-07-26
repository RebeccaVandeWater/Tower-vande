import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')

    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
  }
  async createTicket(req, res, next) {
    try {
      const ticketData = req.body

      ticketData.accountId = req.userInfo.id

      const ticket = await ticketsService.createTicket(ticketData)

      return res.send()
    } catch (error) {
      next(error)
    }
  }


}