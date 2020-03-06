<template>
<div v-if="show">
  <validation-observer ref="observer" v-slot="{ passes }">
    <b-form @submit.stop.prevent="passes(show.update)">
      <validation-provider
          name="titre"
          :rules="{ required: true }"
          v-slot="validationContext">
        <b-form-group
            id="title" label="Titre du spectacle" label-for="title">
          <b-form-input
              type="text"
              :state="getValidationState(validationContext)"
              v-model="show.title" />
          <b-form-invalid-feedback id="title-live-feedback">
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <validation-provider
          name="description"
          :rules="{ required: true }"
          v-slot="validationContext">
        <b-form-group
            id="description" label-for="description"
            label="Description du spectacle">
          <b-form-textarea
              placeholder="Texte d'accroche"
              :state="getValidationState(validationContext)"
              v-model="show.description"></b-form-textarea>
          <b-form-invalid-feedback id="description-live-feedback">
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <div class="pt-2 pb-2">
        <h4>Résumé</h4>
        <ckeditor :editor="editor" v-model="show.summary"
                   :config="editorConfig"></ckeditor>
      </div>
      <div class="pt-2 pb-2">
        <h4>Details</h4>
        <ckeditor :editor="editor" v-model="show.presentation"
                   :config="editorConfig"></ckeditor>
      </div>
      <b-button type="submit" variant="primary" class="mt-2"
                >Mettre à jour</b-button>
    </b-form>
  </validation-observer>
</div>
</template>

<script>
import { Show } from '../models'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';


export default {
    beforeRouteUpdate (to, from, next) {
        this.show = new Show({id: `spectacles/${to.params.id}`});
        this.show.bind();
        next()
    },
    data() {
        return {
            show: null,
            id: 'loading',
            editor: ClassicEditor,
            editorConfig: {
                language: 'fr',
                toolbar: [
                    'heading', '|',
                    'bold', 'italic', 'link', '|',
                    'indent', 'outdent', '|',
                    'bulletedList', 'numberedList', 'blockQuote']
            }
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
    },
    created() {
        this.show = new Show({
            id: `spectacles/${this.$route.params.id}`
        });
        this.show.bind();
    }
}
</script>
