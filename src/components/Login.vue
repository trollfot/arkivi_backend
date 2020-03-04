<template>
  <div>
    <div v-if="Object.keys(errors).length">
      Login failed.
    </div>
    <form v-on:submit.prevent="submit">
      <div>
        <label for="username">Utilisateur</label>
        <input type="text" name="username"
               v-model="credentials.username" />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" name="password"
               v-model="credentials.password" />
      </div>
      <button
          type="submit"
          :disabled="!credentials.username || !credentials.password"
          >Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            credentials: {
                'username': '',
                'password': ''
            },
            errors: {},
        }
    },
    methods: {
        submit() {
            this.$auth.login(JSON.stringify(this.credentials), '/')
        }
    }
}
</script>
