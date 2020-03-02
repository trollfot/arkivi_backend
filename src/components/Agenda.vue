<template>
  <div>
    <b-modal id="add-event" :hide-footer="true"
             no-enforce-focus
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
      <b-card-group deck v-if="agenda">
        <b-card v-for="(event, index) in agenda" v-bind:key="index"
                :header="event.date"
                header-tag="header"
                :title="event.place"
                >
          <b-card-text v-html="event.about"></b-card-text>
          <template v-slot:footer>
            <b-button @click="confirm_delete(event)"
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
import { Event } from '../models'
import spectacles_service from '../spectacles'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';


export default {
    beforeRouteUpdate (to, from, next) {
        this.list(to.params.id)
        next()
    },
    created() {
        this.list(this.$route.params.id);
    },
    data() {
        return {
            agenda: [],
            event: new Event(),
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
        list(id) {
            spectacles_service.list_events(id).then(
                (response) => {
                    this.agenda = response.data;
                },
                (response) => {
                    console.log('FATAL ERROR', response);
                }
            )
        },
        reset() {
            this.$bvModal.hide('add-event');
            this.event = new Event();
            this.$nextTick(() => {
                this.$refs.observer.reset();
            });
        },
        add_event() {
            let id = this.$route.params.id;
            spectacles_service.add_event(id, this.event).then(
                () => {
                    this.reset();
                    this.list(id);
                },
                (response) => {
                    console.log('Error adding', response);
                }
            )
        },
        del_event(date) {
            let id = this.$route.params.id;
            spectacles_service.delete_event(id, date).then(
                () => {
                    this.list(id);
                },
                (response) => {
                    console.log('Error adding', response);
                }
            )
        },
        confirm_delete(event) {
            this.$bvModal.msgBoxConfirm(
                "Cette action est irrévocable.", {
                    title: `Suppression de l'évenement du ${event.date}`,
                    okVariant: 'danger',
                    okTitle: 'Confirmer',
                    cancelTitle: 'Annuler',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                })
                .then(value => {
                    if (value) {
                        this.del_event(event.date);
                    }
                })
                .catch(() => {
                    // An error occurred
                })
        }
    }
}
</script>
