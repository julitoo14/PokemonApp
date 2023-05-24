<template>
  <Navbar></Navbar>
  <div class="container">
    <h2>Register your account</h2>
    <input type="text" v-model="user" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <input
      type="password"
      v-model="confirmPassword"
      placeholder="Confirm Password"
    />
    <Btn
      @click="register(user, password, confirmPassword)"
      variant="yellow"
      class="boton"
      >Register</Btn
    >
    <Alert
      :message="alert.message"
      :show="alert.show"
      @close="alert.show = false"
    ></Alert>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Btn from '../components/Btn.vue';
import Navbar from '../components/Navbar.vue';
import axios  from 'axios';
import { useRouter } from 'vue-router';
import Alert from '../components/Alert.vue';
import { reactive } from 'vue';
const user = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const alert = reactive({
    show: false,
    message: '',
    type: 'danger'
});

const showAlert = (message, type) => {
  alert.show = true;
  alert.message = message;
  alert.type = type;
};

const register = async (user, password, confirmPassword) => {
    if (user != '' && password != '' && confirmPassword != '') {
        if(password.length >= 6 && password.length <= 10){
            if (password !== confirmPassword) {
                showAlert('Las contraseñas no coinciden');
            } else {
                try {
                    const res = await axios.post('https://pokemonapi-0w0d.onrender.com/auth/register', { user: user, password: password });
                    console.log(`${user} se ha registrado correctamente`);

                    router.push('/login');
                } catch (e) {
                    console.log(e.response.data.message);
                }
            }
        }else{
            showAlert('La contraseña debe tener entre 6 y 10 caracteres');
        }

    } else {
        console.log('faltan datos');
    }
}
</script>

<style scoped>
.boton {
  margin-bottom: 1em;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  margin-bottom: 1em;
  height: 2em;
}
</style>
