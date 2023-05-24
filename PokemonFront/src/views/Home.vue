<template>
    <Navbar />
    <SearchPokemon />
    <div class="container" v-if="isLoading = false">
        <div class="pokemon-container" v-for="pokemon in pokemonsPaginados">
                <img :src="pokemon.img" alt="">
                {{ pokemon.name }}      
        </div>
    </div>
    <Spinner v-else/>
    <ul aria-label="Page navigation example">
        <li class="page-item"><button v-if="currentPage>1" @click="getDataPagina(--currentPage)" href="#" class="page-link">&lt; </button></li>
        <li class="page-item"><p>{{ currentPage }}</p></li>
        <li class="page-item"><button @click="getDataPagina(++currentPage)" href="#" class="page-link"> &gt; </button></li>
    </ul>

</template>

<script setup>
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Spinner from '../components/Spinner.vue';
import SearchPokemon from '../components/searchPokemon.vue';
import axios from 'axios';


const pokemons = ref([]);
const elementosPorPagina = 10;
const pokemonsPaginados = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);


const fetchPokemons = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = response.data;
    const results = data['results'];
    results.forEach(result => {
        pokemons.value.push(result['name'])
    });
    getDataPagina(currentPage.value);
    
}

const getDataPagina = async (currentPage) =>{
    let ini = (currentPage * elementosPorPagina) - elementosPorPagina;
    let fin = (currentPage * elementosPorPagina);
    pokemonsPaginados.value = [];
    isLoading.value = true;

    for(let i = ini; i < fin; i++){
        let response = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemons.value[i]}`)
        pokemonsPaginados.value.push({name: pokemons.value[i], img: response.data.sprites['front_default']});
    }
    isLoading.value = false;
}
fetchPokemons();

</script>

<style scoped>
.container{
    color: white;
    display: flex;
    flex-direction: row;
    background-color: var(--navbar-color);
    width: 70%;
    margin: auto;
    margin-top: 1em;
    justify-content: center;
    flex-wrap: wrap;
}

.pokemon-container{
    background-color: rgb(52, 54, 54);
    margin:10px;
    display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    border-radius: 30px;

}

img{
    height: 100px;
    width: 100px;
}

ul{
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    
    
}

ul * {
    margin-right: 10px;
    margin-left: 10px;
    font-size: 1.3em;
}

ul li {
    list-style:none;
    
}

button{
    background-color: var(--navbar-color);
    height: 2em;
    color: var(--text-color);
    border-radius: 10px;
    width: 2em;
    cursor: pointer;
}

ul li a {
    text-decoration: none;
    color: var(--text-color);
}

@media screen and (max-width: 900px) {
  .pokemon-container{
    width: 80%;
  }
}

</style>