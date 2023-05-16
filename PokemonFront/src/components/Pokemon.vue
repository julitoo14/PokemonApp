<template>
    <div class="contenedor">
        <button variant='red' class="remove-button" @click="$emit('remove')"><img class="remove-icon" src="../assets/remove.svg" alt=""></button>
        <img :src="imgSrc" alt="">
        <p>
            {{ name }}
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import Btn from './Btn.vue';
export default {
    components:{
        Btn,
    },

    data(){
        return{
            imgSrc:'',
        }
    },
    props: {
        name: '',

    },

    methods: {
        async getImg() {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.name}`);
                this.imgSrc = res.data.sprites.other['official-artwork'].front_default;
            } catch (e) {
                console.log(e)
            }
        }
    },

    emits: ["remove"],

    mounted(){
        return this.getImg();
    }

}
</script>

<style scoped>

.remove-icon{
    height: 30px;
    width: 30px;
    text-align: center;
    display: block;
    margin: auto;
}
.remove-button{
    height: 40px;
    width: 40px;
    text-align: center;
    position:absolute;
    top: 5px;
    right: 5px;
    background-color: rgb(219, 80, 80);
}

.remove-button:hover{
    cursor: pointer;
    background-color: red;
}

.contenedor {
    position: relative;
    height: 15em;
    width: 32%;
    border: 5px solid yellow;
    margin-top: 10px;
    background-color: gray;
}

img {
    height: 10em;
    width: 10em;
    display: block;
    margin: auto;
}

* {
    color: black;
}

p {
    text-align: center;
    font-size: 2em;
}
</style>