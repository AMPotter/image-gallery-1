<template>
    <div v-if="album !== null">
        <h2>{{ album.name }}</h2>
        <nav>
            <NavLink :to="`/albums/${album.id}/list`">List</NavLink>
            &nbsp;
            <NavLink :to="`/albums/${album.id}/gallery`">Gallery</NavLink>
            &nbsp;
            <NavLink :to="`/albums/${album.id}/new`">New</NavLink>
        </nav>
        <router-view
            :images="album.images"
            :albumId="album.id"
            :on-add="handleAdd"
        ></router-view>
    </div>
</template>

<script>
import { getAlbum, addImage } from '../services/api';
import NavLink from './NavLink';

export default {
  components: {
    NavLink
  },
  data() {
    return {
      album: null
    };
  },
  created() {
    getAlbum(this.$route.params.id)
      .then(album => {
        this.album = album;
      });
  },
  methods: {
    handleAdd(image) {
      image.albumId = this.album.id;
      return addImage(image)
        .then(saved => {
          this.album.images.push(saved);
          this.$router.push(`/albums/${this.albumId}`);
        });
    }
  }
};
</script>

<style scoped>
pre {
    text-align: left;
}
</style>
