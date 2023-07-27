<template>
  <div>
    <form @submit.prevent="createEvent()">
      <div>
        <label for="name"></label>
        <input v-model="editable.name" type="text" name="name" id="name" class="form-control" minlength="3" maxlength="100" placeholder="Event Name" required>
      </div>

      <div>
        <label for="description"></label>
        <textarea v-model="editable.description" name="description" id="description" cols="30" rows="10" placeholder="Description" class="form-control" minlength="3" maxlength="700"></textarea>
      </div>

      <div>
        <label for="coverImg"></label>
        <input v-model="editable.coverImg" type="url" name="coverImg" id="coverImg" placeholder="Cover Image" minlength="3" maxlength="500" class="form-control">
        <p class="text-danger" v-if="editable.coverImg == null">Please fill in cover-image</p>
      </div>

      <div>
        <label for="location"></label>
        <input v-model="editable.location" type="text" name="name" id="location" class="form-control" minlength="3" maxlength="500" placeholder="Event Location">
      </div>

      <div>
        <label for="capacity"></label>
        <input v-model="editable.capacity" type="number" max="500000" min="1" required class="form-control" placeholder="Event Capacity">
      </div>

      <div class="mt-3">
        <label for="startDate" class="ps-2">Event Date</label>
        <input v-model="editable.startDate" type="date" name="startDate" id="startDate" class="form-control" required>
      </div>

      <div class="mt-3">
        <label for="type" class="ps-2">Event Type</label>
        <select v-model="editable.type" class="form-select" aria-label="Default select example" id="type" required>
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
import { ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import { router } from '../router.js';
import { Modal } from 'bootstrap';

export default {
  setup(){

    const editable = ref({})

    return {
      editable,
      types: ['concert', 'convention', 'sport', 'digital'],

      async createEvent(){
        const eventData = editable.value

        const towerEvent = await towerEventsService.createEvent(eventData)

        editable.value = {}

        Modal.getOrCreateInstance('#createEventModal').hide()

        router.push({name: 'Event Details Page', params: {eventId: towerEvent.id}})
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>