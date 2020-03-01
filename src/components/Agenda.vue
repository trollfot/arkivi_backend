<template>
  <div>
    <h1>Agenda</h1>
    <div>
      <form v-on:submit.prevent="add_event">
        <div>
          <datepicker :language="languages[language]"
                       v-model="event.picked_date"></datepicker>
        </div>
        <div>
          de
          <timepicker v-model="event.hour_from"
                       :minInterval="5"></timepicker>
          à
          <timepicker v-model="event.hour_to"
                       :minInterval="5"></timepicker>
        </div>
        <div>
          <input type="text" name="place"
                 v-model="event.place" placeholder="Lieu du spectacle" />
        </div>
        <div>
          <textarea
              name="about" v-model="event.about"
              placeholder="Description de l'évenement"></textarea>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
    <div v-if="agenda">
      <ul>
        <li v-for="(event, index) in agenda" v-bind:key="index">
          {{event.date}} - {{event.hour_from}} à {{event.hour_to}}
          {{event.place}} - {{event.about}}
          <button @click="del_event(event.date)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Event } from '../models'
import spectacles_service from '../spectacles'
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
import AndyHTimePicker from 'andyh-timepicker'


export default {
    beforeRouteUpdate (to, from, next) {
        this.list(to.params.id)
        next()
    },
    created() {
        this.list(this.$route.params.id);
    },
    components: {
        datepicker: Datepicker,
        timepicker: AndyHTimePicker
    },
    data() {
        return {
            language: "fr",
            languages: lang,
            agenda: [],
            event: new Event()
        }
    },
    methods: {
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
        add_event() {
            let id = this.$route.params.id;
            spectacles_service.add_event(id, this.event).then(
                () => {
                    this.event.hour_from = '';
                    this.event.hour_to = '';
                    this.event = new Event();
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
        }
    }
}
</script>
