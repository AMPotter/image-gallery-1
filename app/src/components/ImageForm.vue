<template id="image-template">
    <section class="image-form">
        <form @submit.prevent="handleSubmit">
            <FormControl label="Title">
                <input type="text"
                    name="title" placeholder="Title" required
                    v-model="edit.title">
            </FormControl>
            <FormControl label="Description">
                <input type="text"
                    name="description" placeholder="Description" required
                    v-model="edit.description">
            </FormControl>
            <FormControl label="URL">
                <input type="text"
                    name="url" placeholder="URL" required
                    v-model="edit.url">
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

const initImage = () => {
  return {
    title: '',
    albumId: '',
    description: '',
    url: ''
  };
};

export default {
  components: {
    FormControl
  },
  props: {
    image: Object,
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
      edit: this.image ? Object.assign({}, this.image) : initImage()
    };
  },
  methods: {
    handleSubmit() {
      return this.onEdit(this.edit)
        .then(() => {
          this.edit = initImage();
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
