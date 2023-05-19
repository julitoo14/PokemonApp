<template>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer />
</template>

<script setup>
import Footer from "./components/footer.vue";

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
