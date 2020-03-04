<template>
<div>
  <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"
       >Arkivi: administration</a>
    <ul class="navbar-nav px-3">
      <router-link tag="li" to="/login" class="nav-item text-nowrap"
                   active-class="active" v-if="!$auth.user.authenticated">
        <a class="nav-link">Login</a>
      </router-link>
      <li v-if="$auth.user.authenticated" class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click="$auth.logout()"
           >Logout</a>
      </li>
    </ul>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <nav class="col-md-2 d-sm-block d-md-block bg-light sidebar"
           role="sidebar" v-if="$auth.user.authenticated">
        <ul class="nav flex-column">
          <router-link
            tag="li"
            to="/spectacles"
            class="nav-item"
            active-class="active">
            <a class="nav-link">
              <b-icon-calendar></b-icon-calendar>
              <span>Spectacles</span>
            </a>
          </router-link>
        </ul>
      </nav>
      <main role="main" class="col-md-10 ml-sm-auto mt-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>
  export default {

  }
</script>

<style>
body {
  font-size: .875rem;
}

main > section > section {
    margin-top: 2rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

[role="sidebar"] .nav-link {
  font-weight: 500;
  color: #333;
}

[role="sidebar"] .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

[role="sidebar"] .nav-link.active {
  color: #007bff;
}

[role="sidebar"] .nav-link:hover .feather,
[role="sidebar"] .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
</style>
