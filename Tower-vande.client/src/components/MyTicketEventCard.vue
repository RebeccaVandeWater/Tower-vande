<template>
  <div>
    {{ ticketEventProp.name }}
  </div>

</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { TowerEvent } from '../models/TowerEvent.js';

export default {
props: {
  ticketEventProp: {type: TowerEvent, required:true}
},

  setup(){
    return {
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
