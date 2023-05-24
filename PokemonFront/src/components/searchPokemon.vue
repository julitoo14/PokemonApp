<template>
    <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" placeholder="Search Pokemon">
            <button type="submit" class="searchButton" @click="emit('search')">
                <img src="./icons/search.svg">
            </button>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['search'])
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid var(--accent-color);
  border-right: none;
  padding: 5px;
  height: 2em;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: var(--text-color);
  text-align: center;
  font-size: 2em;
  background-color: var(--navbar-color);
}

.searchTerm:focus{
  color: var(--text-color);
}

.searchButton {
  width: 2.5em;
  height: 4em;
  border: 1px solid var(--accent-color);
  background: var(--accent-color);
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap{
  width: 70%;
  margin: auto;
  margin-top: 2em;
  margin-bottom: 3em;
  
}
</style>