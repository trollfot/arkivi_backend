<template>
  <div>
    <h4>Photos</h4>
    <div class="upload">
      <ul>
        <li v-for="file in files" :key="file.id">
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
        </li>
      </ul>
      <div class="example-btn">
        <file-upload
          class="btn btn-primary"
          :post-action="url"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          :headers="headers"
          :multiple="true"
          :size="1024 * 1024 * 10"
          v-model="files"
          ref="upload">
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>
        <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
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

    }
}
</script>
