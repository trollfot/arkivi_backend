<template>
  <div>
    <h3>Spectacle: {{ $route.params.id }}</h3>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
            class="nav-link"
            active-class="active"
            :to="{name: 'presentation'}"
          ><b-icon-document-text></b-icon-document-text>
          <span class="ml-1">Présentation</span></router-link>
      </li>
      <li class="nav-item">
        <router-link
            class="nav-link"
            active-class="active"
          :to="{name: 'agenda'}">
          <b-icon-clock></b-icon-clock>
          <span class="ml-1">Agenda</span></router-link>
      </li>
      <li class="nav-item">
        <router-link
            class="nav-link"
            active-class="active"
          :to="{name: 'gallery'}">
          <b-icon-images></b-icon-images>
          <span class="ml-1">Photos</span></router-link>
      </li>
      <li class="nav-item">
        <router-link
            class="nav-link"
            active-class="active"
          :to="{name: 'files'}">
          <b-icon-download></b-icon-download>
          <span class="ml-1">Fichiers</span></router-link>
      </li>
    </ul>

    <div class="p-3 bg-white border-right border-bottom border-left">
       <router-view @update="$emit('update')"></router-view>
    </div>

    <div class="d-flex justify-content-end mt-4">
      <b-button @click="confirm_delete"
                variant="danger">
        Effacer
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        async confirm_delete() {
            let success = await this.$bvModal.msgBoxConfirm(
                "Cette action est irrévocable.", {
                    title: `Suppression de '${this.$route.params.id}'`,
                    okVariant: 'danger',
                    okTitle: 'Confirmer',
                    cancelTitle: 'Annuler',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                });
            if (success) {
                this.$emit('delete', this.$route.params.id);
            }
        }
    }
}
</script>
