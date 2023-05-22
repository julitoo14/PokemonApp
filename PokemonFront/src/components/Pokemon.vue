<template>
  <div class="contenedor">
    <button variant="red" class="remove-button" @click="$emit('remove')">
      <img class="remove-icon" src="../assets/remove.svg" alt="" />
    </button>
    <img :src="src" alt="" />
    <p class="name">
      {{ name }}
    </p>
    <div class="peso-altura">
      <p>Peso: {{ weight }} kg</p>
      <p>Altura: {{ height }} m</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: "",
  src: "",
  height: '',
  weight: '',
});
const name = props.name;
const emit = defineEmits(["remove"]);
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
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: var(--danger-color);
}

.remove-button:hover {
  cursor: pointer;
  background-color: red;
}

.peso-altura{
  display: flex;
  justify-content: space-between;
}

.peso-altura p {
  color: white;
  margin: 10px;
  font-size: 1.5em;
}
.contenedor {
  position: relative;
  height: 20em;
  width: 32%;
  border: 5px solid var(--navbar-color);
  margin-top: 10px;
  background-color: rgba(26, 25, 25, 0.827);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  
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

.name {
  text-align: center;
  font-size: 2em;
  color: var(--text-color);
}



@media screen and (max-width: 900px) {
  .contenedor {
    width: 80%;
  }
}
</style>
