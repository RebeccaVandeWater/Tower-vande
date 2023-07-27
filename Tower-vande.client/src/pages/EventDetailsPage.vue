<template>
  <div class="container-fluid" v-if="selectedEvent">
    <section class="row">
      <div class="col-12 text-light d-flex justify-content-between my-4" v-if="selectedEvent.creatorId == account.id && selectedEvent.isCanceled != true">
        <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#editEventModal">
          Edit Event
        </button>
        <button class="btn btn-danger" type="button" @click="removeEvent()">
          Cancel Event
        </button>
      </div>

      <div class="col-12">
          <section class="row text-light d-flex flex-md-row flex-column elevated-4 dark-glass rounded m-2">
            <div class="col-lg-4 col-md-6 col-12 d-flex align-items-center">
              <img class="img-fluid event-img rounded flex-fill" :src="selectedEvent.coverImg" :alt="selectedEvent.name">
            </div>

            <div class="col-lg-8 col-md-6 col-12">

            <div class="mb-md-2 m-2 align-items-center">
              <h1>
                {{ selectedEvent.name }}
              </h1>
              <p class="text-light d-flex justify-content-between">
                <span>{{ selectedEvent.type }}</span>
                <span> Created By: {{ selectedEvent.creator.name }}</span>
              </p>
              <p> {{ selectedEvent.startDate }} </p>
            </div>

            <div class="m-2">
              {{ selectedEvent.location }}
            </div>

            <div class="mt-md-4 m-2">
              <p class="">
                {{ selectedEvent.description }}
              </p>
            </div>

            <div class="d-flex flex-column flex-md-row justify-content-between">
              <div>
                <p class="m-2" v-if="selectedEvent.capacity > 0 && selectedEvent.isCanceled != true">
                  <span class="text-primary fw-bold">{{ selectedEvent.capacity }} </span> Spots Left
                </p>

                <p class="bg-danger text-dark fw-bold m-0 mt-1 text-center" v-else-if="selectedEvent.isCanceled">
                  CANCELLED
                </p>

                <p v-else class="bg-danger text-dark fw-bold m-0 mt-1 text-center">
                  AT CAPACITY
                </p>

                <div class="ms-2 my-3" v-if="selectedEvent.isCanceled != true && account.id">
                  <button v-if="!hasTicket && selectedEvent.capacity > 0" class="btn btn-warning" type="button" @click="createTicket()">
                    Attend <i class="mdi mdi-account-plus"></i>
                  </button>

                  <button v-else class="btn btn-warning" type="button" @click="removeTicket()">
                    Unattend <i class="mdi mdi-account-minus"></i>
                  </button>
                </div>
              </div>
              

            </div>
          </div>
          </section>

        </div>
    </section>

    <section class="row justify-content-center" v-if="selectedEvent.isCanceled != true">
      <div class="col-12 mt-4">
        <p class="text-white-50 ps-2">
          See who's attending
        </p>
        
        <div class="m-1 p-2 dark-glass rounded text-light d-flex">
          <div v-for="ticket in tickets" :key="ticket.id"> 
            <img class="img-fluid avatar-pic me-2" :src="ticket.profile.picture" :alt="ticket.profile.name" :title="ticket.profile.name">
          </div>
        </div>
      </div>
    </section>

    <section class="row justify-content-center">
      <div class="col-9 text-white-50 mt-4">
        <p>
          See what people are saying
        </p>
      </div>
      <div class="col-9 mb-4 dark-glass">
        <CommentsSection />
      </div>
    </section>
  </div>

  <div class="container-fluid" v-else>
    <section class="row">
      <div class="col-12">
        <h2 class="text-light m-4">
          Loading... <i class="mdi mdi-loading mdi-spin"></i>
        </h2>
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { commentsService } from '../services/CommentsService.js';
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import CommentsSection from '../components/CommentsSection.vue';

export default {
    setup() {
        const route = useRoute();
        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await towerEventsService.getEventById(eventId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        async function getTicketsByEventId() {
            try {
                const eventId = route.params.eventId;
                await ticketsService.getTicketsByEventId(eventId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        async function getCommentsByEventId() {
            try {
                const eventId = route.params.eventId;
                await commentsService.getCommentsByEventId(eventId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        watchEffect(() => {
            getEventById(route.params.eventId);
            getTicketsByEventId();
            getCommentsByEventId();
        });
        return {
            selectedEvent: computed(() => AppState.selectedEvent),
            tickets: computed(() => AppState.tickets),
            account: computed(() => AppState.account),
            hasTicket: computed(() => {
                return AppState.tickets.find(t => t.accountId == AppState.account.id);
            }),
            async removeEvent() {
                try {
                    const removeConfirm = await Pop.confirm('Are you sure you want to cancel this event?');
                    if (!removeConfirm) {
                        return;
                    }
                    const eventId = route.params.eventId;
                    await towerEventsService.removeEvent(eventId);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async createTicket() {
                try {
                    const towerEventId = route.params.eventId;
                    const ticketData = { eventId: towerEventId };
                    await ticketsService.createTicket(ticketData);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async removeTicket() {
                try {
                    const removeConfirm = await Pop.confirm('Are you sure you want to unattend this event?');
                    if (!removeConfirm) {
                        return;
                    }
                    const ticketToRemove = AppState.tickets.find(t => t.accountId == AppState.account.id);
                    const ticketId = ticketToRemove.id;
                    await ticketsService.removeTicket(ticketId);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            }
        };
    },
    components: { CommentsSection }
}
</script>


<style lang="scss" scoped>
.event-img{
  width: 50vh;
  height: 50vh;
  object-fit: cover;
  object-position: center;
}

.avatar-pic{
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>
