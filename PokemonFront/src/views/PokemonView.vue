<template>
    Hola {{ name }}
</template>
<script setup({ params })>
import { onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const pokemones = ref([]);
const loggedIn = ref(false);
const apiPath = 'http://localhost:3000/';

const name = ref('hola');


onMounted(() => {
  if (localStorage.getItem('token')) {
    loggedIn.value = true;
    fetchPokemons();
  }
})

const fetchPokemons = async () => {
  const res = await axios.get(`${apiPath}teams/`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`
    }
  });

  pokemones.value = res.data.team;
}
</script>