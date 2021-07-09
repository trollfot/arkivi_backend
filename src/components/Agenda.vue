<template>
  <div>
    <b-modal id="add-event" :hide-footer="true"
             no-enforce-focus v-if="event"
             title="Ajouter un événement">
      <validation-observer ref="observer" v-slot="{ passes }">
        <b-form @submit.stop.prevent="passes(add_event)">
          <validation-provider
            name="date"
                :rules="{ required: true }"
                v-slot="validationContext">
            <b-form-group
              id="date" label="Date de l'évenement" label-for="date">
              <b-form-input
                type="date"
                :state="getValidationState(validationContext)"
                v-model="event.date" />
              <b-form-invalid-feedback id="date-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="lieu"
            :rules="{ required: true }"
            v-slot="validationContext">
            <b-form-group
              id="place" label="Lieu de l'évenement" label-for="place">
              <b-form-input
                type="text" name="place"
                :state="getValidationState(validationContext)"
                v-model="event.place" />
              <b-form-invalid-feedback id="place-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="à partir de"
            :rules="{ required: true }"
            v-slot="validationContext">
            <b-form-group
              id="hour_from" label="A partir de" label-for="hour_from">
              <b-form-input
                type="time" name="hour_from"
                :state="getValidationState(validationContext)"
                v-model="event.hour_from" />
              <b-form-invalid-feedback id="hourfrom-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-form-group
            id="time_to" label="Jusqu'à" label-for="hour_to">
            <b-form-input
              type="time"
              v-model="event.hour_to" />
          </b-form-group>
          <div class="pt-2 pb-2">
            <h4>Description de l&apos;évenement</h4>
            <ckeditor :editor="editor" v-model="event.about"
                      :config="editorConfig"></ckeditor>
          </div>
          <b-button
              class="mt-2 mr-2"
              @click="reset"
              >Annuler</b-button>
          <b-button type="submit" variant="primary" class="mt-2"
                    >Créer</b-button>
        </b-form>
      </validation-observer>
    </b-modal>
    <div>
      <div class="d-flex justify-content-between">
        <h3>Agenda</h3>
        <b-button v-b-modal="'add-event'"
                  class="mt-2 mb-2" variant="success">
          <b-icon-plus></b-icon-plus>
          Ajouter une date
        </b-button>
      </div>
      <b-card-group deck v-if="agenda.contents">
        <b-card v-for="(ev, index) in agenda.contents" v-bind:key="index"
                :header="ev.date"
                header-tag="header"
                :title="ev.place"
                >
          <b-card-text v-html="ev.about"></b-card-text>
          <template v-slot:footer>
            <b-button @click="confirm_delete(ev)"
                      class="mt-2 mb-2" variant="danger">
              <b-icon-trash></b-icon-trash>
              Supprimer
            </b-button>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { Folder, Event } from '../models'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';


export default {
    async beforeRouteUpdate (to, from, next) {
        this.agenda = new Folder({
            content: Event,
            id: `shows/${to.params.id}/agenda`
        });
        this.$flash(await this.agenda.bind());
        await this.agenda.list();
        this.event = this.agenda.spawn();
        next()
    },
    data() {
        return {
            event: null,
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
        reset() {
            this.$bvModal.hide('add-event');
            this.event = this.agenda.spawn();
            this.$nextTick(() => {
                this.$refs.observer.reset();
            });
        },
        async add_event() {
            await this.event.create({sync_folder: true});
        },
        async confirm_delete(event) {
            let success = await this.$bvModal.msgBoxConfirm(
                "Cette action est irrévocable.", {
                    title: `Suppression de l'évenement du ${event.date}`,
                    okVariant: 'danger',
                    okTitle: 'Confirmer',
                    cancelTitle: 'Annuler',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                });
            if (success) {
                await event.remove();
            }
        }
    },
    async created() {
        this.agenda = new Folder({
            content: Event,
            id: `shows/${this.$route.params.id}/gallery`
        });
        this.$flash.add(await this.agenda.bind());
        await this.agenda.list();
        this.event = this.agenda.spawn();
    }
}
</script>
