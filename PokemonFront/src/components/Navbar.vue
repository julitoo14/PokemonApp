<template>
    <nav>
  <div>
    <a href="#"><img src="../assets/Poké_Ball_icon.svg" alt="Logo"></a>
  </div>
  <div> 
    <h1>Pokemon Team</h1>
  </div>
  <div class="login">
    <Btn variant='red' @click="$emit('login')">Iniciar sesión</Btn>
    <Btn variant="red" @click="$emit('register')">Registrarse</Btn>
  </div>
</nav>
</template>

<script>
import Btn from './Btn.vue';
export default{
    components: {Btn,},
    props:{

      emits: ['login', 'register'],
    }
};
</script>

<style scoped>
  nav {
  background-color: rgb(46, 45, 45);
  color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  display: flex;
}

nav div{
  width: 33%;
}

nav img {
  height: 70px;
  margin-right: 10px;
}

nav h1 {
  text-align: center;
  font-size: 2em;
}

.login{
  display: flex;
  justify-content: flex-end;
}


</style>