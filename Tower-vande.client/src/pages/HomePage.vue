<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 d-flex">
        <img class="img-fluid home-banner-img flex-fill mx-4" src="https://images.unsplash.com/photo-1563215613-bcdbce1c7234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Concert">
      </div>
    </section>

    <section class="row m-4">
      <div class="col-12 d-none d-md-block">
        <section class="row dark-glass d-flex rounded justify-content-center text-center py-2">

          <div class="col-md-2 col-6">
            <button class="btn btn-primary m-2" type="button" @click="filterEvent = ''">
              All
            </button>
          </div>
          <div class="col-md-2 col-6">
            <button class="btn btn-primary m-2" type="button" @click="filterEvent = 'concert'">
              Concert
            </button>
          </div>
          <div class="col-md-2 col-6">
            <button class="btn btn-primary m-2" type="button" @click="filterEvent = 'sport'">
              Sport
            </button>
          </div>
          <div class="col-md-2 col-6">
            <button class="btn btn-primary m-2" type="button" @click="filterEvent = 'digital'">
              Digital
            </button>
          </div>
          <div class="col-md-2 col-6">
            <button class="btn btn-primary m-2" type="button" @click="filterEvent = 'convention'">
              Convention
            </button>
          </div>
        </section>
      </div>

      <div class="col-12 col-md-4" v-for="towerEvent in towerEvents" :key="towerEvent.id">
        <TowerEventCard :towerEventProp="towerEvent" />
      </div>
    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js'
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import TowerEventCard from '../components/TowerEventCard.vue';


export default {
    setup() {
        const filterEvent = ref('')

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
          filterEvent,
          
          towerEvents: computed(() => {
            if(filterEvent.value == ""){
              return AppState.towerEvents
            } else{
              return AppState.towerEvents.filter(e => e.type == filterEvent.value)
            }
            }),
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
