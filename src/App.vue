<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li v-if="!user.authenticated">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="user.authenticated">
            <router-link to="/personal">Personal info</router-link>
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
  .form {
    text-align: left;
    width: 600px;
    margin: auto;
  }

  .form input {
    margin: 10px auto;
  }

  h1 {
    font-size: 2em;
    text-align: center;
    margin-top: 0
  }

  p {
    text-align: center;
  }

  small {
    line-height: 20px;
    display: block;
  }
</style>
