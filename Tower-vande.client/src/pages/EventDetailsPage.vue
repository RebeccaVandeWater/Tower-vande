<template>
  <div class="container-fluid">
    <section class="row" v-if="selectedEvent">
      <div class="col-12 text-light d-flex justify-content-between my-4" v-if="selectedEvent.creatorId == account.id && selectedEvent.isCanceled != true">
        <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#editEventModal">
          Edit Event
        </button>
        <button class="btn btn-danger" type="button" @click="removeEvent()">
          Cancel Event
        </button>
      </div>

      <div class="col-12 text-light">
        <div class="d-flex elevated-4 dark-glass rounded">
          <div>
            <img class="img-fluid event-img rounded" :src="selectedEvent.coverImg" :alt="selectedEvent.name">
          </div>

          <div class="ms-4">
            <div class="mb-2 align-items-center">
              <h1>
                {{ selectedEvent.name }}
              </h1>
              <p class="text-secondary">
                {{ selectedEvent.type }}
              </p>
              <p> {{ selectedEvent.startDate }} </p>
            </div>

            <div>
              {{ selectedEvent.location }}
            </div>

            <div class="mt-4">
              <p class="description-size">
                {{ selectedEvent.description }}
              </p>
            </div>

            <div class="d-flex justify-content-between">
              <div>
                <p class="mb-0 mt-1" v-if="selectedEvent.capacity > 0 && selectedEvent.isCanceled != true">
                  <span class="text-primary fw-bold">{{ selectedEvent.capacity }} </span> Spots Left
                </p>
    
                <p class="bg-danger text-dark fw-bold m-0 mt-1 text-center" v-else-if="selectedEvent.isCanceled">
                  CANCELLED
                </p>
    
                <p v-else class="bg-danger text-dark fw-bold m-0 mt-1 text-center">
                  AT CAPACITY
                </p>
              </div>
              
              <div class="ms-4" v-if="selectedEvent.isCanceled != true && selectedEvent.capacity > 0">
                <button class="btn btn-warning" type="button">
                  Attend <i class="mdi mdi-account-plus"></i>
                </button>
              </div>
  
            </div>
            <div class="text-secondary text-end mt-4">
              <p>
                Created By: {{ selectedEvent.creator.name }}
              </p>
            </div>
          </div>

        </div>
      </div>

      <div class="col-12 mt-4 text-light">
        Attendees Section
      </div>

      <div class="col-12 mt-4 text-light">
        Comments Section
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup(){

    const route = useRoute()

    async function getEventById(){
      try {
        const eventId = route.params.eventId

        await towerEventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    watchEffect(() => {
      getEventById(route.params.eventId)
    })

    return {
      selectedEvent: computed(() => AppState.selectedEvent),
      account: computed(() => AppState.account),

      async removeEvent(){
        try {
          const removeConfirm = await Pop.confirm('Are you sure you want to cancel this event?')

          if(!removeConfirm){
            return
          }
          const eventId = route.params.eventId

          await towerEventsService.removeEvent(eventId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.event-img{
  width: 40vh;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

.description-size{
  max-width: 40vw
}
</style>
