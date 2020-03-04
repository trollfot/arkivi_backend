<template>
<section id="spectacles">
  <div class="d-flex justify-content-between">
    <h1>Spectacles</h1>

  </div>
  <b-modal id="add-show" :hide-footer="true"
           title="Ajouter un spectacle">
    <b-alert variant="danger"
             v-if="errors['add-show']"
             v-model="errors['add-show']">
      {{ errors['add-show'] }}
    </b-alert>
    <div class="p-2">
      <validation-observer ref="observer" v-slot="{ passes }">
        <b-form @submit.stop.prevent="passes(add_spectacle)">
          <validation-provider
              name="identifiant"
              :rules="{ required: true, min: 3, alphanum: true }"
              v-slot="validationContext">
            <b-form-group id="identifier" label-for="id">
              <b-form-input
                  id="id"
                  name="id"
                  v-model="spectacle.id"
                  placeholder="identifiant du spectacle"
                  :state="getValidationState(validationContext)"
                  aria-describedby="id-live-feedback"
                  ></b-form-input>
              <b-form-invalid-feedback id="id-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
              name="titre"
              :rules="{ required: true, min: 3 }"
              v-slot="validationContext">
            <b-form-group id="title" label-for="title">
              <b-form-input
                  size="lg"
                  id="title"
                  name="title"
                  class="mt-2 mb-2"
                  v-model="spectacle.title"
                  placeholder="Titre du spectacle"
                  :state="getValidationState(validationContext)"
                  aria-describedby="title-live-feedback"
                  ></b-form-input>
              <b-form-invalid-feedback id="title-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <b-button
              class="mt-2 mr-2"
              @click="reset"
              >Annuler</b-button>
          <b-button
              variant="primary"
              class="mt-2"
              type="submit"
              >Créer</b-button>
        </b-form>
      </validation-observer>
    </div>
  </b-modal>
  <section class="inner">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-toggle target="spectaclesList"></b-navbar-toggle>
      <b-collapse id="spectaclesList" is-nav>
        <ul class="navbar-nav mr-auto">
          <router-link
              :key="index"
              tag="li"
              class="nav-item"
              v-for="(spectacle, index) in spectacles.contents"
              active-class="active"
              :to="{name: 'spectacle', params: {id: spectacle.id}}"
              >
            <a class="nav-link">{{spectacle.title}}</a>
          </router-link>
        </ul>
        <div class="my-2 my-lg-0">
          <b-button v-b-modal="'add-show'" variant="success">
            <b-icon-plus></b-icon-plus>
            Ajouter
          </b-button>
        </div>
      </b-collapse>
    </b-navbar>

    <article role="show"
             class="container-fluid bg-light p-4 mb-3 border border-top-0">
      <router-view
          @update="spectacles.list()"></router-view>
    </article>

  </section>
</section>
</template>

<script>
import { Folder, Show } from '../models'

export default {
    data() {
        const spectacles = new Folder({
            id: 'spectacles', content: Show, bound: true
        });
        return {
            spectacles: spectacles,
            errors: {
                'add-show': '',
            },
            spectacle: spectacles.spawn()
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        reset() {
            this.$bvModal.hide('add-show');
            this.spectacle = this.spectacles.spawn();
            this.$nextTick(() => {
                this.$refs.observer.reset();
            });
        },
        async add_spectacle() {
            const success = await this.spectacle.create();
            if (success) {
                this.reset();
                this.list();
            } else {
                this.errors['add-show'] = (
                    "Une erreur est survenue lors de l'ajout.")
            }
        }
    },
    created() {
        this.spectacles.list();
    }
}
</script>
