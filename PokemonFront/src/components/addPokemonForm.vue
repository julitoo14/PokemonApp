<template>
    <div class="contenedor">
        <img src="../assets/add.svg" alt="">
        <Btn variant='green' class="add-button" @click="showAddPokemon">Add Pokemon</Btn>
    </div>

    <Modal :show="showAddPokemonForm" @close="showAddPokemonForm = false, alert.show = false">
        <template v-slot:header>
            <h2>Ingrese el nombre del pokemon que desea agregar a su equipo</h2>
        </template>
        <template v-slot:content>
            <label>nombre Pokemon</label>
            <input type="text" v-model="pokemonName">
        </template>
        <template v-slot:footer>
            <Btn @click="showAddPokemonForm = false, alert.show= false"></Btn>
            <Btn @click="$emit('submit', pokemonName)">Submit</Btn>

        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Btn from './Btn.vue';
import Alert from './Btn.vue';
export default {
    components: {
        Btn,
        Modal,
        Alert
    },

    data() {
        return {
            pokemonName: '',
            alert: {
                show: false,
                message: "",
                type: "danger",
            },
            showAddPokemonForm: false,
        }
    },

    methods: {
        showAlert(message, type) {
            this.alert.show = true;
            this.alert.message = message;
            this.alert.type = type;
        },
        showAddPokemon() {
            this.showAddPokemonForm = true;
        },
    },

    emits: ['submit', 'close'],
}
</script>

<style scoped>
.contenedor {
    position: relative;
    height: 15em;
    width: 32%;
    border: 5px solid yellow;
    margin-top: 10px;
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    height: 10em;
    width: 10em;
    display: block;
    margin: auto;
}

.add-button{
    margin: 0;
    width: 60%;
    margin-bottom: 10px;
}


</style>