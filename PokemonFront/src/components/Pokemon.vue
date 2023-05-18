<template>
    <div class="contenedor">
        <button variant='red' class="remove-button" @click="$emit('remove')"><img class="remove-icon"
                src="../assets/remove.svg" alt=""></button>
        <img :src="src" alt="">
        <RouterLink id="pokemonView" :name="name" :to=url >
        <p>
            {{ name }}
        </p>
        </RouterLink>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: '',
    src: '',
});
const name = props.name;
const emit = defineEmits(['remove']);
const url = computed(() =>{
    return '/pokemon/' + name;
})

</script>

<style scoped>
.remove-icon {
    height: 30px;
    width: 30px;
    text-align: center;
    display: block;
    margin: auto;
}

.remove-button {
    height: 40px;
    width: 40px;
    text-align: center;
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgb(219, 80, 80);
}

.remove-button:hover {
    cursor: pointer;
    background-color: red;
}

.contenedor {
    position: relative;
    height: 15em;
    width: 32%;
    border: 5px solid yellow;
    margin-top: 10px;
    background-color: gray;
}

img {
    height: 10em;
    width: 10em;
    display: block;
    margin: auto;
}

* {
    color: black;
}

p {
    text-align: center;
    font-size: 2em;
}
</style>