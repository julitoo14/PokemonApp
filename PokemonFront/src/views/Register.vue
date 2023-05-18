<template>
    <Navbar></Navbar>
    <div class="container">
        <h2>Register your account</h2>
        <input type="text" v-model="user" placeholder="Username">
        <input type="text" v-model="password" placeholder="Password">
        <input type="text" v-model="confirmPassword" placeholder="Confirm Password">
        <Btn @click="register(user, password, confirmPassword)" variant="yellow">Register</Btn>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Btn from '../components/Btn.vue';
import Navbar from '../components/Navbar.vue';
import axios  from 'axios';
import { useRouter } from 'vue-router';
const user = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const register = async (user, password, confirmPassword) => {
    if (user != '' && password != '' && confirmPassword != '') {
        if (password !== confirmPassword) {
            console.log("passwords no coinciden");
        } else {

            try {
                const res = await axios.post('http://localhost:3000/auth/register', { user: user, password: password });
                console.log(`${user} se ha registrado correctamente`);
                  
                router.push('/login');
            } catch (e) {
                console.log(e.response.data.message);
            }
        }

    } else {
        console.log('faltan datos');
    }
}

</script>

<style scoped>
.container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input{
        margin-bottom: 1em;
        height: 2em;
    }
</style>