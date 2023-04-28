<template>
  <nav>
  <div>
    <a href="#"><img src="./assets/Poké_Ball_icon.svg" alt="Logo"></a>
  </div>
  <div> 
    <h1>Pokemon Team</h1>
  </div>
  <div class="login">
    <button>Iniciar sesión</button>
    <button>Registrarse</button>
  </div>
</nav>
</template>


<script>

</script>


<style scoped>
  nav {
  background-color: rgb(46, 45, 45);
  color: rgb(226, 98, 98);
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

nav button {
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 10px;
}

nav button:hover {
  cursor: pointer;
  background-color: rgb(226, 98, 98);
  color: white;
}

.login{
  display: flex;
  justify-content: flex-end;
}

</style>
