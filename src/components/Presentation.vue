<template>
<div v-if="doc">
  <validation-observer ref="observer" v-slot="{ passes }">
    <b-form @submit.stop.prevent="passes(update)">
      <validation-provider
          name="titre"
          :rules="{ required: true }"
          v-slot="validationContext">
        <b-form-group
            id="title" label="Titre du spectacle" label-for="title">
          <b-form-input
              type="title"
              :state="getValidationState(validationContext)"
              v-model="doc.title" />
          <b-form-invalid-feedback id="date-live-feedback">
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <div class="pt-2 pb-2">
        <h4>Résumé</h4>
        <ckeditor :editor="editor" v-model="doc.summary"
                   :config="editorConfig"></ckeditor>
      </div>
      <div class="pt-2 pb-2">
        <h4>Details</h4>
        <ckeditor :editor="editor" v-model="doc.presentation"
                   :config="editorConfig"></ckeditor>
      </div>
      <b-button type="submit" variant="primary" class="mt-2"
                >Mettre à jour</b-button>
    </b-form>
  </validation-observer>
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
                        this.$emit('update');
                    },
                    (response) => {
                        console.log('FATAL ERROR', response);
                    }
                )
        },
    },
    created() {
        this.load(this.$route.params.id);
    }
}
</script>
