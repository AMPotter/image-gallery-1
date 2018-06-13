<template>
    <div>
        <h3>Images List</h3>
        <ul v-if="images">
            <li
                v-for="image in images"
                :key="image.id"
            >
                <strong>{{ image.title }}</strong>
                &nbsp;
                {{ image.description }}
                <img v-bind:src="image.url">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['images']
};
</script>

<style scoped>
img {
    max-width: 200px;
    max-height: 200px;
}
</style>
