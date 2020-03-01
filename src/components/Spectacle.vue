<template>
  <div>
    <h1>Spectacle</h1>
    <h2>{{ $route.params.id }}</h2>

    <div v-if="doc">
      <h3>Résumé</h3>
      <ckeditor :editor="editor" v-model="doc.summary"
                :config="editorConfig"></ckeditor>

      <h3>Details</h3>
      <ckeditor :editor="editor" v-model="doc.presentation"
                :config="editorConfig"></ckeditor>

       <button @click="update">Sauver</button>
    </div>

    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li>
            <router-link :to="{name: 'agenda'}">Agenda</router-link>
          </li>
          <li>
            <router-link :to="{name: 'gallery'}">Photos</router-link>
          </li>
          <li>
            <router-link :to="{name: 'files'}">Fichiers</router-link>
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
import spectacles_service from '../spectacles'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';


export default {
    beforeRouteUpdate (to, from, next) {
        this.load(to.params.id)
        next()
    },
    data() {
        return {
            id: 'loading',
            doc: {},
            editor: ClassicEditor,
            editorConfig: {
                language: 'fr'
            }
        }
    },
    methods: {
        load(id) {
            spectacles_service.get_spectacle(id).then(
                (response) => {
                    this.doc = response.data;
                },
                (response) => {
                    console.log('FATAL ERROR', response);
                }
            )
        },
        update() {
            spectacles_service.update_spectacle(
                this.$route.params.id, this.doc).then(
                    () => {
                        console.log('updated')
                    },
                    (response) => {
                        console.log('FATAL ERROR', response);
                    }
                )
        }
    },
    created() {
        this.load(this.$route.params.id);
    }
}
</script>
