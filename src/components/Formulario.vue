<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione um projeto</option>
                        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TemporizadorTarefa @temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TemporizadorTarefa from './TemporizadorTarefa.vue';
import { useStore } from '@/store';

export default defineComponent({
    name: "FormularioCronometro",
    components: {
        TemporizadorTarefa
    },
    methods: {
        finalizarTarefa(tempoDeExecucao: number): void {
            this.$emit("terminarTarefa", {
                id: new Date().toISOString(),
                tempoDeExecucao: tempoDeExecucao,
                descricao: this.descricao,
                projeto: this.projetos.find(projeto => projeto.id == this.idProjeto)
            });
            this.descricao = '';
        }
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    emits: ['terminarTarefa'],
    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>