<template>
  <div>
    <h1>Spectacles</h1>
    <div>
      <h2>Ajouter un spectacle</h2>
      <form v-on:submit.prevent="add_spectacle">
        <div>
          Identifiant
          <input type="text" name="id"
                 v-model="spectacle.id" />
        </div>
        <div>
          Title  <input type="text" name="title"
                        v-model="spectacle.title" />
        </div>
        <button :disabled="!spectacle.id || !spectacle.title">Créer</button>
      </form>
    </div>

    <div v-if="spectacles.length">
      <h2>Listes des spectacles</h2>
      <ul id="spectacles">
        <li v-for="(spectacle, index) in spectacles" v-bind:key="index">
          <router-link
              :to="{name: 'spectacle', params: {id: spectacle.id}}"
              >{{spectacle.title}}</router-link>
          <button @click="del_spectactle(spectacle.id)">Supprimer</button>
        </li>
      </ul>

      <div class="container">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import spectacles_service from '../spectacles'

  export default {
      data() {
          return {
              spectacles: [],
              errors: {},
              spectacle: {
                  id: '',
                  titre: ''
              }
          }
      },
      methods: {
          list() {
              spectacles_service.list().then(
                  (response) => {
                      this.spectacles = response.data;
                  },
                  (response) => {
                      console.log('FATAL ERROR', response);
                  }
              )
          },
          del_spectactle(id) {
              spectacles_service.delete_spectacle(id).then(
                  () => {
                      this.list();
                  },
                  (response) => {
                      console.log('Error deleting', response);
                  }
              )
          },
          add_spectacle() {
              spectacles_service.create_spectacle(this.spectacle).then(
                  () => {
                      this.spectacle = {
                          id: '',
                          titre: ''
                      }
                      this.list();
                  },
                  (response) => {
                      console.log('Error adding', response);
                  }
              )
          }
      },
      created() {
          this.list();
      }
  }
</script>
