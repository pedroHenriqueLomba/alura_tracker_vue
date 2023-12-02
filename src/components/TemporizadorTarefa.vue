<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroTarefa :tempoEmSegundos="tempoEmSegundos" />
        <button class="button" @click="iniciar" :disabled="funcionando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!funcionando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CronometroTarefa from './CronometroTarefa.vue';

export default defineComponent({
    name: "TemporizadorTarefa",
    components: {
        CronometroTarefa
    },
    methods: {
        iniciar() {
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos++;
            }, 1000);
            this.funcionando = !this.funcionando;
        },
        finalizar() {
            clearInterval(this.cronometro);
            this.funcionando = !this.funcionando;
            this.$emit('temporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            funcionando: false
        }
    },
    emits: ['temporizadorFinalizado']
})
</script>

<style scoped></style>