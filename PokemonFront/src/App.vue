<template>
  <Navbar @login="showLogin" @register="showRegister"/>  <!-- se toman los eventos de los botones de login y register -->
  
  <Modal :show="showLoginModel" @close="showLoginModel = false">
  
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
      <Btn @click="login(this.user, this.password)" variant="red">Iniciar Sesion</Btn>
    </template>

  </Modal>
</template>


<script>
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import Btn from './components/Btn.vue';
import axios from "axios";

const component = {

  components: {
    Navbar,
    Modal,
    Btn,
  },

  data() {
    return {
      showLoginModel: false,
      showRegisterModel: false,
      user: '',
      password:'',
      token: '',
    };
  },

  methods:{
    showLogin(){
      this.showLoginModel=true;
      console.log(this.showLoginModel);
    },

    showRegister(){
      this.showRegisterModel=true;
      console.log(this.showRegisterModel)
    },

    async login(user, password){
      try{
        const res = await axios.post('http://localhost:3000/auth/login', {user: user, password: password});
        this.token = res.data;
        console.log(this.token);
      }catch(e){
        console.log(e.message);
      }
    }
  }
};
export default component;
</script>


<style scoped>
.login-form-div{
  display: flex;
  justify-content:space-around;
  align-items: center;
  margin-bottom: 1em;
}

.login-form-div label{
  width: 20%;
}

.login-form-div input{
  width: 60%;
}



</style>
