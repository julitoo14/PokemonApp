<template>
  <Navbar></Navbar>
  <form class="container">
    <h2>Login to your account</h2>
    <div class="login-form-div">
      <input type="text" v-model="user" placeholder="Username" />
    </div>

    <div class="login-form-div">
      <input type="password" v-model="password" placeholder="Password" />
    </div>

    <div class="modal-footer">
      <Spinner v-if="isLoading" />
      <Btn v-else @click="login(user, password)" variant="yellow">Iniciar Sesion</Btn>
    </div>
  </form>
</template>

<script setup>
import { onMounted } from "vue";
import Btn from "../components/Btn.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import Spinner from '../components/Spinner.vue';


const user = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.push("/");
  }
});

const login = async (user, password) => {
  if (user != "" && password != "") {
    try {
      isLoading.value = true;
      const res = await axios.post("https://pokemonapi-0w0d.onrender.com/auth/login", {
        user: user,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", user);
      isLoading.value = false;
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
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
