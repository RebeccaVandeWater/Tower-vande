<template>

<div v-if="selectedEvent">
  <div class="text-light">
    <div class="m-3">
      <form @submit.prevent="createComment()">
      <label for="body"></label>
      <textarea v-model="editable.body" name="body" id="body" cols="30" rows="10" class="form-control" placeholder="Join the conversation" required minlength="3" maxlength="200"></textarea>

      <div class="text-end my-2">
        <button class="btn btn-success">
          Post Comment
        </button>
      </div>
      </form>
    </div>
  </div>

    <div v-for="comment in comments" :key="comment.id" class="d-flex justify-content-around col-12 align-items-center">

      <div>
        <img class="img-fluid comment-avatar-img" :src="comment.creator.picture" :alt="comment.creator.name">
      </div>

      <div class="bg-white text-dark p-3 d-flex flex-fill mb-3 ms-2 flex-column">
        <div>
          <p>
            {{ comment.creator.name }}
            <span>
              {{ comment.isAttending }}
            </span>
          </p>
          <p>
            {{ comment.body }}
          </p>
        </div>

        <div class="d-flex justify-content-between">
          <span> {{ comment.createdAt }} </span>
          <div v-if="comment.creatorId == account.id">
            <button class="btn btn-danger" type="button" @click="removeComment()">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

export default {

  setup(){
    const editable = ref({})

    const route = useRoute()

    return {
      editable,
      comments: computed(() => AppState.comments),
      selectedEvent: computed(() => AppState.selectedEvent),
      account: computed(() => AppState.account),

      async createComment(){
        try {
          const commentData = editable.value

          commentData.eventId = route.params.eventId

          await commentsService.createComment(commentData)

          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }

      },

      async removeComment(){
        try {
          const removeComment = await Pop.confirm('Are you sure you want to delete this comment?')

          if(!removeComment){
            return
          }

          const commentToRemove = AppState.comments.find(c => c.creatorId == AppState.account.id)

          const commentId = commentToRemove.id

          await commentsService.removeComment(commentId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.comment-avatar-img{
  width: 10vh;
  height: 10vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>
