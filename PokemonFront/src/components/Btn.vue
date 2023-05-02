<template>
    <button :style="{ backgroundColor: backgroundColor }" @click.prevent="$emit('click')" v-bind="$attrs" :class="{circle: applyCircleClass}"> 
        <slot /> 
    </button>
</template>

<script>
export default{
    props:{
        variant: {
            required: false,
            default: "white",
            validator(value){ // se valida que la opcion ingresada sea valida, si no queda la default
                const options = ["gray", "white", "blue", "red", "green", "yellow"];
                return options.includes(value);
            },
        },

        circle:{
            default: false,
            type: Boolean,
        },
    },

    computed: {
        backgroundColor() {
            const options = { 
                gray: "gray",
                white: "white",
                blue: "blue",
                red: "red",
                green: "green",
                yellow: 'yellow',
            };
            return options[this.variant];
        },

        applyCircleClass(){
            return this.circle; // se le da un True a la prop circle
        },
    },

    emits: ['click'],
}
</script>

<style scoped>
button {
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 10px;
}

button:hover {
  cursor: pointer;
  background-color: rgb(204, 201, 27);
  color: rgb(8, 8, 8);
}

.circle{
    border-radius: 50%;
}
</style>