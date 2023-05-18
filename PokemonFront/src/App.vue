<template>
  <RouterView></RouterView>
</template>


<script setup>
import Navbar from './components/Navbar.vue';
import axios from "axios";
import Alert from "./components/Alert.vue";
import { onMounted, reactive, ref } from 'vue';

const user = ref('');
const password = ref('');
const confirmPassword = ref('');

const logueado = ref(false);
const alert = reactive({
  alert: {
    show: false,
    message: "",
    type: "danger",
  }
}
);

onMounted(() => {
  if (localStorage.getItem('token')) {
    logueado.value = true;
  }
});

const showAlert = (message, type) => {
  alert.show = true;
  alert.message = message;
  alert.type = type;
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

const removePokemon = (id) => {
  pokemones.value = pokemones.value.filter((pokemon) => pokemon.id !== id);
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
</style>
