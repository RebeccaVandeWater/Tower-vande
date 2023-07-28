<template>

  <section class="row">
    <div v-if="selectedEvent">
      <div class="text-light">
        <div class="m-3">
          <form @submit.prevent="createComment()">
          <label for="body"></label>
          <textarea v-model="editable.body" name="body" id="body" cols="30" rows="10" class="form-control" placeholder="Join the conversation" required minlength="3" maxlength="200"></textarea>

          <div class="text-end my-2">
            <button class="btn soft-green text-dark">
              Post Comment
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </section>


  <section class="row justify-content-center">
    <div v-for="comment in comments" :key="comment.id" class="d-flex justify-content-around col-11">

      <div>
        <img class="img-fluid comment-avatar-img elevation-5" :src="comment.creator.picture" :alt="comment.creator.name">
      </div>

      <div class="bg-light text-dark p-2 d-flex flex-fill mb-3 ms-2 flex-column elevation-5">
        <div>
          <div class="d-flex justify-content-between">
            <span class="fw-bold"> {{ comment.creator.name }} </span>
            <span> {{ comment.isAttending }} </span>
            <div>
              <span class="pe-3 text-body-secondary"> {{ comment.createdAt }} </span>
              <button class="btn btn-danger" type="button" @click="removeComment()" v-if="comment.creatorId == account.id">
                <i class="mdi mdi-delete"></i>
              </button>
            </div>
          </div>
          <p>
            {{ comment.body }}
          </p>
        </div>

        <div class="d-flex justify-content-between">
          
        </div>
      </div>
    </div>
  </section>


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

.soft-green{
  background-color: #79e7ab;
}
</style>
