<template>
  <router-link :to="{name: 'Event Details Page', params: {eventId: towerEventProp.id}}">

  <div class="elevation-4 m-4 rounded-top">
    <div>
      <img class="img-fluid rounded-top" :src="towerEventProp.coverImg" :alt="towerEventProp.name">
    </div>

    <div class="dark-glass text-light p-2">
      <div>
        <p class="fs-4 fw-bold">
          {{ towerEventProp.name }}
        </p>

        <p>
          {{ towerEventProp.location }}
        </p>

        <span>
          {{ towerEventProp.startDate }}
        </span>

        <p class="text-end mb-0 mt-1" v-if="towerEventProp.capacity > 0 && towerEventProp.isCanceled != true">
          <span class="text-primary fw-bold">{{ towerEventProp.capacity }} </span> Spots Left
        </p>

        <p class="bg-danger text-dark fw-bold m-0 mt-1 text-center" v-else-if="towerEventProp.isCanceled">
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
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';

export default {
  props: {
    towerEventProp: {type: TowerEvent, required:true}
  },

  setup(){
    const route = useRoute()

    return {
      route,
      towerEvents: computed(() => AppState.towerEvents),
      // hasTicket: computed(() => {
      //     return AppState.tickets.find(t => t.accountId == AppState.account.id);
      // }),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
