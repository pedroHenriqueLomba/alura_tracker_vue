<template>
    <header>
        <h1 class="centro">
            <img src="../assets/logo.png" alt="Logo">
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoBotao }}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BarraLateral",
    data() {
        return {
            modoEscuroAtivado: false
        }
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivado = !this.modoEscuroAtivado;
            this.$emit('alterarTema', this.modoEscuroAtivado);
        }
    },
    emits: ['alterarTema'],
    computed: {
        textoBotao() {
            let textoBotao: string;
            if (this.modoEscuroAtivado) {
                textoBotao = "Desativar modo escuro";
            } else {
                textoBotao = "Ativar modo escuro";
            }
            return textoBotao;
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.centro {
    text-align: center;
}
</style>