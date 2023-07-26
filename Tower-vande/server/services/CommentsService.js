import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')

    return comments
  }
  async createComment(commentData) {

    const event = await towerEventsService.getEventById(commentData.eventId)

    if (event.isCanceled == true) {
      throw new Forbidden(`${event.name} has been cancelled. You cannot create a comment on a cancelled event.`)
    }

    const comment = await dbContext.Comments.create(commentData)

    await comment.populate('creator', 'name picture')

    return comment
  }

  async removeComment(commentId, userId) {
    const commentToRemove = await dbContext.Comments.findById(commentId)

    if (!commentToRemove) {
      throw new BadRequest(`A comment does not exist with the id: ${commentId}`)
    }

    if (commentToRemove.creatorId != userId) {
      throw new Forbidden(`You are not the creator of this comment. You may not remove it.`)
    }

    await commentToRemove.remove()

    return commentToRemove
  }

}

export const commentsService = new CommentsService