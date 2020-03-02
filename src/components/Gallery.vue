<template>
<div>
  <h4>Photos</h4>
  <div class="upload row p-2">
    <div id="uploader" class="col-8">
      <div class="example-btn">
        <file-upload
            ref="upload"
            class="btn btn-primary mr-2 mt-2"
            :drop-directory="true"
            :headers="headers"
            :multiple="true"
            :post-action="url"
            :size="1024 * 1024 * 10"
            accept="image/*"
            drop=".drop-active"
            @input-filter="inputFilter"
            v-model="files">
          <b-icon-folder></b-icon-folder>
          <span class="ml-1">Sélectionner les fichiers</span>
        </file-upload>

        <b-button variant="success" class="mr-2 mt-2"
                  v-if="!$refs.upload || !$refs.upload.active"
                  @click.prevent="$refs.upload.active = true">
          <b-icon-upload></b-icon-upload>
          <span class="ml-1">Commencer l'envoi</span>
        </b-button>

        <b-button variant="danger" class="mt-2"
                  v-else @click.prevent="$refs.upload.active = false">
          <b-icon-alert-octagon-fill></b-icon-alert-octagon-fill>
          <span class="ml-1">Arrêter l'envoi</span>
        </b-button>
      </div>

      <div class="drop-active">
        <h4 v-show="$refs.upload && $refs.upload.dropActive"
            >Glisser / Déposer des fichiers ici pour les envoyer</h4>
      </div>

      <div class="table-responsive" v-if="files.length">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Thumb</th>
              <th>Name</th>
              <th>Size</th>
              <th>Speed</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td>
                <img v-if="file.thumb"
                     :src="file.thumb" width="40" height="auto" />
                <span v-else>No Image</span>
              </td>
              <td>
                <div class="filename">
                  {{file.name}}
                </div>
                <div class="progress"
                     v-if="file.active || file.progress !== '0.00'">
                  <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}" role="progressbar" :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                </div>
              </td>
              <td>{{file.size | formatSize}}</td>
              <td>{{file.speed | formatSize}}</td>
              <td v-if="file.error">{{file.error}}</td>
              <td v-else-if="file.success">success</td>
              <td v-else-if="file.active">active</td>
              <td v-else></td>
              <td>
                <b-dropdown text="Actions" class="m-md-2" size="sm">
                  <b-dropdown-item
                      href="#" v-if="file.active"
                      @click.prevent="$refs.upload.update(file, {active: false})"
                      >Annuler</b-dropdown-item>

                  <b-dropdown-item
                      href="#"
                      v-else-if="file.error && $refs.upload.features.html5"
                      @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})">Ré-essayer</b-dropdown-item>

                  <b-dropdown-item
                      v-else :disabled="file.success" href="#"
                      @click.prevent="file.success ? false : $refs.upload.update(file, {active: true})">Envoyer</b-dropdown-item>

                  <b-dropdown-item
                      href="#"
                      @click.prevent="$refs.upload.remove(file)"
                      >Retirer</b-dropdown-item>
                </b-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-4">
      toto
    </div>
  </div>
</div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import spectacles_service from '../spectacles'
import auth from '../auth'

export default {
    components: {
        FileUpload,
    },
    data() {
        return {
            files: [],
            url: `${spectacles_service.url_root}/${this.$route.params.id}/gallery`,
            headers: auth.getAuthHeader()
        }
    },
    methods: {
        inputFilter(newFile, oldFile) {
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
                newFile.thumb = ''
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob
                }
            }
        },
    }
}
</script>

<style>
.drop-active {
   height: 50px;
   border: 2px dashed #666;
}
</style>
