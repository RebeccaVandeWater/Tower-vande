import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')

    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.removeComment)
  }
  async createComment(req, res, next) {
    try {
      const commentData = req.body

      commentData.creatorId = req.userInfo.id

      const comment = await commentsService.createComment(commentData)

      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const commentId = req.params.commentId

      const userId = req.userInfo.id

      const commentToRemove = await commentsService.removeComment(commentId, userId)

      return res.send(commentToRemove)
    } catch (error) {
      next(error)
    }
  }
}