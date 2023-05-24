<template>
  <div class="contenedor">
    <img src="../assets/add.svg" alt="" />
    <Btn class="add-button" @click="showAddPokemon"
      >Add Pokemon</Btn
    >
  </div>

  <Modal :show="showAddPokemonForm" @close="showAddPokemonForm = false">
    <template v-slot:header>
      <h2>Ingrese el nombre del pokemon que desea agregar a su equipo</h2>
    </template>
    <template v-slot:content>
      <input type="text" v-model="pokemonName" placeholder="Pokemon name" />
    </template>
    <template v-slot:footer>
      <Btn @click="$emit('submit', pokemonName)">Submit</Btn>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "./Modal.vue";
import Btn from "./Btn.vue";
import { reactive, ref } from "vue";
const pokemonName = ref("");
const alert = reactive({
  alert: {
    show: false,
    message: "",
    type: "danger",
  },
});
const showAddPokemonForm = ref(false);
const emit = defineEmits(["submit", "close"]);

const showAddPokemon = () => {
  showAddPokemonForm.value = true;
};
</script>

<style scoped>
.contenedor {
  position: relative;
  height: 20em;
  width: 32%;
  border: 5px solid var(--navbar-color);
  margin-top: 10px;
  background-color: rgba(26, 25, 25, 0.827);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
}

img {
  height: 10em;
  width: 10em;
  display: block;
  margin: auto;
}

input{
  margin: auto;
  text-align: center;
  height: 2em;
  width: 80%;
}

.add-button {
  margin: 0;
  width: 60%;
  margin-bottom: 30px;
}

@media screen and (max-width: 900px) {
  .contenedor {
    width: 80%;
  }
}
</style>
