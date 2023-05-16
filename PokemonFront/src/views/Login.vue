<template>
    
    <h2>Login to your account</h2>
    <div class="login-form-div">
      <label>User</label>
      <input type="text" v-model="user">
    </div>

    <div class="login-form-div">
      <label>Password</label>
      <input type="text" v-model="password">
    </div>
  
    <div class="modal-footer">
      <Btn @click="login(this.user, this.password)" variant="yellow">Iniciar Sesion</Btn>
      <Alert :message="alert.message" :show="alert.show" @close="alert.show = false" :type=alert.type
        class="modal-alert"> </Alert>
    </div>
  
</template>

<script setup>

</script>