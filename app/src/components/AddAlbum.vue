<template>
    <div>
        <AlbumForm
            label="Add"
            :on-edit="onAdd"
        />
    </div>
</template>

<script>
import AlbumForm from './AlbumForm';

export default {
  props: ['onAdd'],
  components: {
    AlbumForm
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
