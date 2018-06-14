<template>
    <section>
        <ImageForm
            label="Add"
            :on-edit="onAdd"
        />
    </section>
</template>

<script>
import ImageForm from './ImageForm';

export default {
  props: ['onAdd'],
  components: {
    ImageForm
  }
};
</script>

<style scoped>
ul.list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
</style>
