<template>
  <Navbar @login="showLogin" @register="showRegister">
    <template v-slot:login>
      <div v-if="logueado" class="login">
        <p class="welcome">Bienvenido {{ this.user }}!</p>
        <Btn variant="gray" @click="signOut"> Cerrar Sesion </Btn>
      </div>
      <div v-else class="login">
        <Btn variant='yellow' @click="showLogin">Iniciar sesión</Btn>
        <Btn variant="yellow" @click="showRegister">Registrarse</Btn>
      </div>
    </template>
  </Navbar> <!-- se toman los eventos de los botones de login y register -->

  <Modal :show="showLoginModel" @close="showLoginModel = false, alert.show = false">

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
        <Btn @click="login(this.user, this.password)" variant="yellow">Iniciar Sesion</Btn>
        <Alert :message="alert.message" :show="alert.show" @close="alert.show = false" :type=alert.type
          class="modal-alert"> </Alert>
      </div>
    </template>

  </Modal>

  <Modal :show="showRegisterModel" @close="showRegisterModel = false, alert.show = false">
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
      <Btn @click="register(this.user, this.password, this.confirmPassword)" variant="yellow">Register</Btn>
      <Alert :message="alert.message" :show="alert.show" @close="alert.show = false" :type=alert.type class="modal-alert">
      </Alert>
    </template>
  </Modal>
</template>


<script>
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import Btn from './components/Btn.vue';
import axios from "axios";
import Alert from "./components/Alert.vue";

const component = {

  components: {
    Navbar,
    Modal,
    Btn,
    Alert,
  },

  data() {
    return {
      showLoginModel: false,
      showRegisterModel: false,
      user: '',
      password: '',
      confirmPassword:'',
      token: '',
      logueado: false,
      alert: {
        show: false,
        message: "",
        type: "danger",
      },
    };
  },

  methods: {
    showAlert(message, type) {
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = type;
    },

    showLogin() {
      this.showLoginModel = true;
      console.log(this.showLoginModel);
    },

    showRegister() {
      this.showRegisterModel = true;
      console.log(this.showRegisterModel)
    },

    async login(user, password) {
      if (user != '' && password != '') {
        try {
          const res = await axios.post('http://localhost:3000/auth/login', { user: user, password: password });
          this.token = res.data;
          this.showLoginModel = false;
          this.logueado = true;
        } catch (e) {
          this.showAlert(e.response.data.message, "danger");
        }
      } else {
        this.showAlert("Faltan datos");
      }
    },

    async register(user, password, confirmPassword) {
      if (user != '' && password != '' && confirmPassword != '') {
        if (password !== confirmPassword) {
          this.showAlert("passwords no coinciden");
        } else {

          try {
            const res = await axios.post('http://localhost:3000/auth/register', { user: user, password: password });
            this.showAlert(`${user} se ha registrado correctamente`,"info");
          } catch (e) {
            this.showAlert(e.response.data.message);
          }
        }

      } else {
        this.showAlert("Faltan datos");
      }
    },

    signOut() {
      this.token = '';
      this.logueado = false;
    }
  }
};
export default component;
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
