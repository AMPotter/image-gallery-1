<template>
    <section class="album-form">
        <form @submit.prevent="handleSubmit">
            <FormControl label="Title">
                <input type="text"
                    name="title" placeholder="Title"
                    v-model="edit.title">
            </FormControl>
            <FormControl label="Description">
                <input type="text"
                    name="description" placeholder="Description"
                    v-model="edit.description">
            </FormControl>
            <FormControl>
                <button type="submit">{{ label }}</button>
                <button
                    v-if="onCancel"
                    @click="onCancel">
                    Cancel
                </button>
            </FormControl>
        </form>
    </section>
</template>

<script>
import FormControl from './FormControl';

const initAlbum = () => {
  return {
    title: '',
    description: ''
  };
};

export default {
  components: {
    FormControl
  },
  props: {
    album: Object,
    albums: Array,
    label: String,
    onEdit: {
      type: Function,
      required: true
    },
    onCancel: Function
  },
  data() {
    return {
      error: null,
      edit: this.album ? Object.assign({}, this.album) : initAlbum()
    };
  },
  methods: {
    handleSubmit() {
      return this.onEdit(this.edit)
        .then(() => {
          this.edit = initAlbum();
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style>
.neighborhood-form {
	width: 300px;
	text-align: left;
}

label {
	display: block;
}
</style>
