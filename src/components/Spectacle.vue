<template>
  <div>
    <h1>Spectacle</h1>
    <h2>{{ $route.params.id }}</h2>

    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li>
            <router-link :to="{name: 'presentation'}"
                >Présentation</router-link>
          </li>
          <li>
            <router-link :to="{name: 'agenda'}"
                >Agenda</router-link>
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
export default {

}
</script>
