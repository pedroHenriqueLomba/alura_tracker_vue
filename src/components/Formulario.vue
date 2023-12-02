<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column">
                <TemporizadorTarefa @temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorTarefa from './TemporizadorTarefa.vue';

export default defineComponent({
    name: "FormularioCronometro",
    components: {
        TemporizadorTarefa
    },
    methods: {
        finalizarTarefa(tempoDeExecucao: number): void {
            this.$emit("terminarTarefa", {
                tempoDeExecucao: tempoDeExecucao,
                descricao: this.descricao
            });
            this.descricao = '';
        }
    },
    data() {
        return {
            descricao: ''
        }
    },
    emits: ['terminarTarefa']
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>