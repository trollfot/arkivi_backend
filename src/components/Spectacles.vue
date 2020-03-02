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
              v-for="(spectacle, index) in spectacles"
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
          @delete="remove_show"
          @update="list"></router-view>
    </article>

  </section>
</section>
</template>

<script>
import { router } from '../main';
import { Show } from '../models'
import spectacles_service from '../spectacles'

export default {
    data() {
        return {
            spectacles: [],
            errors: {
                'add-show': '',
            },
            spectacle: new Show()
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        list() {
            spectacles_service.list().then(
                (response) => {
                    this.spectacles = response.data;
                },
                (response) => {
                    console.log('FATAL ERROR', response);
                }
            )
        },
        remove_show(id) {
            spectacles_service.delete_spectacle(id).then(
                () => {
                    this.list();
                    router.push('/spectacles');
                },
                (response) => {
                    console.log('Error deleting', response);
                }
            )
        },
        reset() {
            this.$bvModal.hide('add-show');
            this.spectacle = new Show();
            this.$nextTick(() => {
                this.$refs.observer.reset();
            });
        },
        add_spectacle() {
            spectacles_service.create_spectacle(this.spectacle).then(
                () => {
                    this.reset();
                    this.list();
                },
                (error) => {
                    if (error.response) {
                        alert(error.response);
                    } else {
                        this.errors['add-show'] = (
                            "Une erreur est survenue lors de l'ajout.")
                    }
                }
            )
        }
    },
    created() {
        this.list();
    }
}
</script>
