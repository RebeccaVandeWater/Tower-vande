<template>

<div class="container-fluid">
  <section class="row text-light">
    <div class="col-12">
      <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="account-img img-fluid" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
  </section>

  <section class="row">
    <div class="col-12 text-light">
      <h3 class="ms-3">
        My Events
      </h3>
    </div>
    <div class="col-12 col-md-3" v-for="ticket in myTickets" :key="ticket.id">
      <router-link :to="{name: 'Event Details Page', params: {eventId: ticket.event.id}}">

        <div class="elevation-4 m-4 rounded-top">
          <div>
            <img class="img-fluid rounded-top" :src="ticket.event.coverImg || 'https://images.unsplash.com/photo-1545129139-1beb780cf337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'" :alt="ticket.event.name">
          </div>

          <div class="dark-glass text-light p-2">
            <div>
              <p class="fs-4 fw-bold">
                {{ ticket.event.name }}
              </p>

              <p>
                {{ ticket.event.location }}
              </p>

              <span>
                {{ new Date(ticket.event.startDate).toLocaleString() }}
              </span>

              <p class="text-end mb-0 mt-1" v-if="ticket.event.capacity - ticket.event.ticketCount > 0 && ticket.event.isCanceled != true">
                <span class="text-primary fw-bold"> {{ ticket.event.capacity - ticket.event.ticketCount }} </span> Spots Left
              </p>

              <p class="bg-danger text-dark fw-bold m-0 mt-1 text-center" v-else-if="ticket.event.isCanceled">
                CANCELLED
              </p>

              <p v-else class="bg-danger text-dark fw-bold m-0 mt-1 text-center">
                AT CAPACITY
              </p>

              <!-- FIXME Add "Attending" on condition -->
              <!-- <p v-if="route.path == '/account' && hasTicket" class="bg-warning text-dark fw-bold m-0 mt-1 text-center">
                Attending
              </p> -->
          </div>
        </div>
      </div>
      </router-link>
    </div>
  </section>

    <div class="col-12">
      <div>
        <!-- <h1 class="text-light">
          My Upcoming Events
        </h1> -->
      </div>
    </div>
</div>

  
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
// import { towerEventsService } from '../services/TowerEventsService.js';
import { ticketsService } from '../services/TicketsService.js';

export default {
    setup() {
        // function filterMyEvents() {
        //     towerEventsService.filterMyEvents();
        // }

        async function getMyTickets(){
          await ticketsService.getMyTickets()
        }

        onMounted(() => {
            // filterMyEvents();
            getMyTickets()
        });

        return {
            account: computed(() => AppState.account),
            myTickets: computed(() => AppState.myTickets),
        };
    },
}
</script>

<style scoped>
.account-img{
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.event-img{
  width: 30vh;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>
