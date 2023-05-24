<template>
  <Navbar></Navbar>
  <Spinner v-if="isLoading == true"></Spinner>
  <div class="pokemones" v-if="loggedIn">
    <Pokemon
      v-for="pokemon in pokemones"
      v-bind="pokemon"
      :pokemon="pokemon"
      :key="pokemon.id"
      :src="pokemon.imgSrc"
      :name="pokemon.name"
      :height="pokemon.height"
      :weight="pokemon.weight"
      @remove="removePokemon(pokemon.id)"
    >
    </Pokemon>
    <AddPokemonForm v-if="pokemones.length <= 5" @submit="addPokemon" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Pokemon from "../components/Pokemon.vue";
import AddPokemonForm from "../components/addPokemonForm.vue";
import { ref } from "vue";
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Spinner from "../components/Spinner.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loggedIn = ref(false);
const pokemones = ref([]);
const apiPath = "https://pokemonapi-0w0d.onrender.com/";
const counter = ref(0);
const isLoading = ref(false);
onMounted(() => {
  if (localStorage.getItem("token")) {
    loggedIn.value = true;
    fetchPokemons();
  }else{
    router.push('/');
  }
});

const addPokemon = async (pokemon) => {
  const options = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  const name = pokemon.toLowerCase();
  await axios.post(`${apiPath}teams/pokemons`, { name: name }, options);
  pokemones.value.push({ name: name, id: ++counter.value });
  fetchPokemons();
};

const fetchPokemons = async () => {
  isLoading.value = true;
  const res = await axios.get(`${apiPath}teams/`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  });

  pokemones.value = res.data.team;
  isLoading.value= false;
};

const removePokemon = async (id) => {
  pokemones.value = pokemones.value.filter((pokemon) => pokemon.id !== id);
  await axios.delete(`${apiPath}teams/pokemons/${id}`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  });
  fetchPokemons();
};
</script>

<style scoped>
.pokemones {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 2.7em;
}

@media screen and (max-width: 900px) {
  
}
</style>
