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
    <div class="col-12 col-md-3" v-for="event in myEvents" :key="event.id">
      <TowerEventCard :towerEventProp="event" />
    </div>
  </section>

    <div class="col-12">
      <div>
        <h1>
          My Upcoming Events
        </h1>
      </div>
    </div>
</div>

  
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService.js';
import TowerEventCard from '../components/TowerEventCard.vue';

export default {
    setup() {
        function filterMyEvents() {
            towerEventsService.filterMyEvents();
        }
        onMounted(() => {
            filterMyEvents();
        });
        return {
            account: computed(() => AppState.account),
            myEvents: computed(() => AppState.myEvents)
        };
    },
    components: { TowerEventCard }
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
