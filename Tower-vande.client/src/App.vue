<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <ModalComponent id="createEventModal">
    <template #header>
      Create Event
    </template>
    <template #body>
      <CreateEventForm />
    </template>
  </ModalComponent>

  <ModalComponent id="editEventModal">
    <template #header>
      Edit Event
    </template>
    <template #body>
      <EditEventForm />
    </template>
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ModalComponent from './components/ModalComponent.vue'
import CreateEventForm from './components/CreateEventForm.vue'
import EditEventForm from './components/EditEventForm.vue'



export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, CreateEventForm, EditEventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

body{
  background-color: #192E3C;
}

.dark-glass{
  background: rgba(55, 69, 71, 0.74);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.6px);
  -webkit-backdrop-filter: blur(5.6px);
  border: 1px solid rgb(69, 89, 92);
}
</style>
