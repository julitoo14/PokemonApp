<template>
  <nav>
    <div class="nav-div pokeball">
      <a href="#"><img class="pokeball" src="../assets/Poké_Ball_icon.svg" alt="Logo"></a>
    </div>
    <div class="nav-div logo-div">
      <img class="logo" src="../assets/Pokemon.svg"><img>
    </div>
    <div class="nav-div if-div buttons-div">
      <div v-if="logueado" class="login">
        <p class="welcome">Bienvenido {{ user }}!</p>
        <Btn variant="gray" class="buttons" @click="signOut"> Cerrar Sesion </Btn>
      </div>
      <div v-else class="login if-div">
        <Btn variant='yellow' class="buttons"><RouterLink to="/login">Iniciar sesión</RouterLink></Btn>
        <Btn variant="yellow" class="buttons"><RouterLink to="/register">Registrarse</RouterLink></Btn>
      </div>
    </div>

  </nav>
</template>

<script setup>
import { onMounted } from 'vue';
import Btn from './Btn.vue';
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import { computed } from 'vue';

const logueado = computed(() =>{
  if(localStorage.getItem('token')){
    return true;
  }
  return false;
});
const user = localStorage.getItem('name');
const router = useRouter();


const signOut = () => {
  localStorage.clear();
  router.push('/login')
}

</script>

<style scoped>


nav {
  background-color: var(--navbar-color);
  color: red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}

.logo-div {
  margin: auto;
  display: flex;
  justify-content: center;
}

.nav-div {
  width: 33%;
}

.pokeball {
  height: 80px;
}

.logo {
  margin: auto;
  height: 80px;
}

.login{
  display: flex;
}

.buttons-div {
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}

@media screen and (max-width: 900px) {
  .pokeball{
    display: none;
  }

  .buttons-div{
    margin: 0;
  }

  nav{
    display: flex;
    flex-direction: column;
  }

  .if-div{
    margin-top: 1em;
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
  }
  .buttons{
    height: 3em;
    widows: 4em;
}
}
</style>