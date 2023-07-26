<template>
  <div>
    <form @submit.prevent="editEvent()">
      <div>
        <label for="name"></label>
        <input v-model="editable.name" type="text" name="name" id="name" class="form-control" minlength="3" maxlength="100" placeholder="Event Name">
      </div>

      <div>
        <label for="description"></label>
        <textarea v-model="editable.description" name="description" id="description" cols="30" rows="10" placeholder="Description" class="form-control" minlength="3" maxlength="700"></textarea>
      </div>

      <div>
        <label for="coverImg"></label>
        <input v-model="editable.coverImg" type="url" name="coverImg" id="coverImg" placeholder="Cover Image" minlength="3" maxlength="500" class="form-control">
      </div>

      <div>
        <label for="location"></label>
        <input v-model="editable.location" type="text" name="name" id="location" class="form-control" minlength="3" maxlength="500" placeholder="Event Location">
      </div>

      <div>
        <label for="capacity"></label>
        <input v-model="editable.capacity" type="number" max="500000" min="1" class="form-control" placeholder="Event Capacity">
      </div>

      <div class="mt-3">
        <label for="startDate" class="ps-2">Event Date</label>
        <input v-model="editable.startDate" type="date" name="startDate" id="startDate" class="form-control">
      </div>

      <div class="mt-3">
        <label for="type" class="ps-2">Event Type</label>
        <select v-model="editable.type" class="form-select" aria-label="Default select example" id="type">
          <option disabled selected value="">Open this select menu</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <div class="mt-3 text-end">
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import { Modal } from 'bootstrap';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';

export default {
  setup(){

    const route = useRoute()

    const editable = ref({})

    watchEffect(() => {
      if(AppState.selectedEvent){
        editable.value = {...AppState.selectedEvent}
      }
    })

    return {
      editable,
      types: ['concert', 'convention', 'sport', 'digital'],

      async editEvent(){
        const eventData = editable.value

        const eventId = route.params.eventId

        await towerEventsService.editEvent(eventData, eventId)

        editable.value = {}

        Modal.getOrCreateInstance('#editEventModal').hide()
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>