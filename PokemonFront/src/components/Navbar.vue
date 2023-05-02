<template>
    <nav>
  <div class="nav-div">
    <a href="#"><img class="pokeball" src="../assets/Poké_Ball_icon.svg" alt="Logo"></a>
  </div>
  <div class="nav-div logo-div"> 
    <img class="logo" src="../assets/Pokemon.svg"><img>
  </div>
  <div class="nav-div buttons-div">
    <slot name="login"></slot>
  </div>
  
</nav>

</template>

<script>

export default{
    components: {},
    data(){
      return{
        show: true,
      }
    },
};
</script>

<style scoped>
  nav {
  background-color: rgb(46, 45, 45);
  color: red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  width: 100%;
}

.logo-div{
  margin: auto;
  display: flex;
  justify-content: center;
}

.nav-div{
  width: 33%;
}

.pokeball {
  height: 80px;
}

.logo {
  margin: auto;
  height: 80px;
}



.buttons-div{
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}


</style>