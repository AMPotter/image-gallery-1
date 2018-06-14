<template>
    <div>
        <h2>Albums</h2>
        <nav>
            <NavLink :to="`/albums/add`">Add</NavLink>
        </nav>
        <ul v-if="albums">
            <li
            v-for="album in albums"
            :key="album.id"
            >
                <router-link :to="`/albums/${album.id}`">
                    {{ album.title }} {{ album.imageCount }}
                </router-link>
            </li>
        </ul>
        <router-view
            :albums="albums"
            :album="album"
            :on-add="handleAdd"
        ></router-view>
    </div>
</template>

<script>
import { getAlbums, addAlbum } from '../services/api';
import NavLink from './NavLink';

export default {
  components: {
    NavLink
  },
  data() {
    return {
      albums: null,
      album: {
        id: '',
        title: '',
        description: ''
      }
    };
  },
  created() {
    getAlbums()
      .then(albums => {
        this.albums = albums;
      });
  },
  methods: {
    handleAdd(album) {
      this.album = album;
      return addAlbum(album)
        .then(saved => {
          this.albums.push(saved);
          this.$router.push(`/albums/${saved.id}`);
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
