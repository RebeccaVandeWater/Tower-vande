<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 d-flex">
        <img class="img-fluid home-banner-img flex-fill mx-4" src="https://images.unsplash.com/photo-1563215613-bcdbce1c7234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Concert">
      </div>
    </section>

    <section class="row">
      <div class="col-12">
        <p class="text-light">
          Filter Buttons
        </p>
      </div>

      <div class="col-12 col-md-3" v-for="towerEvent in towerEvents" :key="towerEvent.id">
        <TowerEventCard :towerEventProp="towerEvent" />
      </div>
    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import TowerEventCard from '../components/TowerEventCard.vue';


export default {
    setup() {
        async function getEvents() {
            try {
                await towerEventsService.getEvents();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
            towerEvents: computed(() => AppState.towerEvents)
        };
    },
    components: { TowerEventCard }
}
</script>

<style scoped lang="scss">

.home-banner-img{
  width: 100vh;
  height: 20vh;
  object-fit: cover;
  object-position: center;
  border: 1px solid #dc5f2c
}
</style>
