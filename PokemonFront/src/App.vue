<template>
  <Navbar @login="showLogin" @register="showRegister">
    <template v-slot:login>
      <div v-if="logueado" class="login">
        <p class="welcome">Bienvenido {{ user }}!</p>
        <Btn variant="gray" @click="signOut"> Cerrar Sesion </Btn>
      </div>
      <div v-else class="login">
        <Btn variant='yellow' @click="showLogin">Iniciar sesión</Btn>
        <Btn variant="yellow" @click="showRegister">Registrarse</Btn>
      </div>
    </template>
  </Navbar> <!-- se toman los eventos de los botones de login y register -->

  <Modal :show="showLoginModel.show" @close="showLoginModel.show = false, alert.show = false">

    <template v-slot:header>
      <h2>Login to your account</h2>
    </template>

    <template v-slot:content>
      <div class="login-form-div">
        <label>User</label>
        <input type="text" v-model="user">
      </div>
      <div class="login-form-div">
        <label>Password</label>
        <input type="text" v-model="password">
      </div>
    </template>

    <template v-slot:footer>
      <div class="modal-footer">
        <Btn @click="login(user, password)" variant="yellow">Iniciar Sesion</Btn>
        <Alert :message="alert.message" :show="alert.show" @close="alert.show = false" :type=alert.type
          class="modal-alert"> </Alert>
      </div>
    </template>

  </Modal>

  <Modal :show="showRegisterModel.show" @close="showRegisterModel.show = false, alert.show = false">
    <template v-slot:header>
      <h2>Register your account</h2>
    </template>

    <template v-slot:content>
      <form>
        <div class="login-form-div">
          <label>User</label>
          <input type="text" v-model="user">
        </div>
        <div class="login-form-div">
          <label>Password</label>
          <input type="text" v-model="password">
        </div>
        <div class="login-form-div">
          <label>Confirm Password</label>
          <input type="text" v-model="confirmPassword">
        </div>
      </form>
    </template>

    <template class="modal-footer" v-slot:footer>
      <Btn @click="register(user, password, confirmPassword)" variant="yellow">Register</Btn>
      <Alert :message="alert.message" :show="alert.show" @close="alert.show = false" :type=alert.type class="modal-alert">
      </Alert>
    </template>
  </Modal>
  <div class="pokemones" v-if="logueado">
    <Pokemon v-for="pokemon in pokemones" :key="pokemon.id" :name="pokemon.name" @remove="removePokemon(pokemon.id)">
    </Pokemon>
    <AddPokemonForm v-if="pokemones.length <= 5" @submit="addPokemon" />

  </div>
</template>


<script setup>
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import Btn from './components/Btn.vue';
import axios from "axios";
import Alert from "./components/Alert.vue";
import Pokemon from './components/Pokemon.vue';
import AddPokemonForm from './components/addPokemonForm.vue';
import { onMounted, reactive, ref } from 'vue';

const showLoginModel = reactive({
  show: false
});
const showRegisterModel = reactive({
  show: false
});
const user = ref('');
const password = ref('');
const confirmPassword = ref('');
const counter = ref(0);
const pokemones = ref([]);
const apiPath = 'http://localhost:3000/';
const logueado = ref(false);
const alert = reactive({
  alert: {
    show: false,
    message: "",
    type: "danger",
  }
}
);

onMounted( () => {
  if(localStorage.getItem('token')){
    fetchPokemons();
    logueado.value = true;
  }
});

const showAlert = (message, type) => {
  alert.show = true;
  alert.message = message;
  alert.type = type;
}

const showLogin = () => {
  showLoginModel.show = true;
}

const showRegister = () => {
  showRegisterModel.show = true;
}

const login = async (user, password) => {
  if (user != '' && password != '') {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { user: user, password: password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('name', user)
      showLoginModel.show = false;
      logueado.value = true;
      fetchPokemons();
    } catch (e) {
      showAlert(e.response.data.message, "danger");
    }
  } else {
    showAlert("Faltan datos");
  }
}

const register = async (user, password, confirmPassword) => {
  if (user != '' && password != '' && confirmPassword != '') {
    if (password !== confirmPassword) {
      showAlert("passwords no coinciden");
    } else {

      try {
        const res = await axios.post('http://localhost:3000/auth/register', { user: user, password: password });
        showAlert(`${user} se ha registrado correctamente`, "info");
      } catch (e) {
        showAlert(e.response.data.message);
      }
    }

  } else {
    showAlert("Faltan datos");
  }
}

const signOut = () => {
  logueado.value = false;
  localStorage.clear();
}

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

const removePokemon = (id) => {
  pokemones.value = pokemones.value.filter((pokemon) => pokemon.id !== id);
}

const fetchPokemons = async () => {

  

  const res = await axios.get(`${apiPath}teams/`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`
    }
  });

  pokemones.value = res.data.team;
}


</script>


<style scoped>
.login-form-div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.5em;
}

.login-form-div label {
  width: 20%;
}

.login-form-div input {
  width: 60%;
}

.welcome {
  font-size: 1.5em;
}

.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.modal-alert {
  width: 60%;
  text-align: center;
  margin: auto;
  margin-top: 1em;
}

.pokemones {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
