<template>
  <Navbar></Navbar>
  <div class="pokemones" v-if="loggedIn">
    <Pokemon v-for="pokemon in pokemones" :key="pokemon.id" :name="pokemon.name" @remove="removePokemon(pokemon.id)">
    </Pokemon>
    <AddPokemonForm v-if="pokemones.length <= 5" @submit="addPokemon" />

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Pokemon from '../components/Pokemon.vue';
import AddPokemonForm from '../components/addPokemonForm.vue'
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '../components/Navbar.vue'

const loggedIn = ref(false);
const pokemones = ref([]);
const apiPath = 'http://localhost:3000/';
const counter = ref(0);


onMounted(() => {
  if (localStorage.getItem('token')) {
    loggedIn.value = true;
    fetchPokemons();
  }
})

const addPokemon = async (pokemon) => {

  const options = {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`
    }
  }
  const name = pokemon.toLowerCase();

  await axios.post(`${apiPath}teams/pokemons`, { name: name }, options);
  pokemones.value.push({ name: name, id: ++counter.value });
}

const fetchPokemons = async () => {
  const res = await axios.get(`${apiPath}teams/`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`
    }
  });

  pokemones.value = res.data.team;
}

const removePokemon = async (id) => {
  console.log(id);
  console.log(pokemones.value);
  pokemones.value = pokemones.value.filter((pokemon) => pokemon.id !== id);
  console.log(pokemones.value);

  await axios.delete(`${apiPath}teams/pokemons/${id}`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`
    }
  });
  fetchPokemons();

}

</script>

<style scoped>
.pokemones {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>