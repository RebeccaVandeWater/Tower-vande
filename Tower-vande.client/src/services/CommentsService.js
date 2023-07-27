import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)

    logger.log('[GOT COMMENTS FROM EVENT]', res.data)
    AppState.comments = res.data.map(pojo => new Comment(pojo))
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)

    logger.log('[CREATED COMMENT]', res.data)

    AppState.comments.push(new Comment(res.data))
  }

  async removeComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)

    logger.log('[DELETED COMMENT]', res.data)
    const oldComment = AppState.comments.findIndex(c => c.id == commentId)

    AppState.comments.splice(oldComment, 1)
  }
}

export const commentsService = new CommentsService