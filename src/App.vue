<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li v-if="!user.authenticated">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="user.authenticated">
            <router-link to="/spectacles">Spectacles</router-link>
          </li>
          <li v-if="user.authenticated" @click="logout()">
            <router-link to="/login">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import auth from './auth'

  export default {
    data() {
      return {
        user: auth.user
      }
    },
    methods: {
      logout() {
        auth.logout()
      }
    }
  }
</script>

<style>

</style>
