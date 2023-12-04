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
import { computed, defineComponent, ref } from 'vue';
import TemporizadorTarefa from './TemporizadorTarefa.vue';
import { useStore } from '@/store';
import { OBTER_PROJETOS } from '@/store/tiposAcoes';
import IProjeto from '@/interfaces/IProjeto';

export default defineComponent({
    name: "FormularioCronometro",
    components: {
        TemporizadorTarefa
    },
    emits: ['terminarTarefa'],
    setup(props, { emit }) {
        const store = useStore()

        const descricao = ref("");
        const idProjeto = ref("");

        store.dispatch(OBTER_PROJETOS);

        const projetos = computed(() => store.state.projeto.projetos);

        const finalizarTarefa = (tempoDeExecucao: number): void => {
            emit("terminarTarefa", {
                id: new Date().toISOString(),
                tempoDeExecucao: tempoDeExecucao,
                descricao: descricao.value,
                projeto: projetos.value.find((projeto: IProjeto) => projeto.id === idProjeto.value)
            });
            descricao.value = '';
        }

        return {
            finalizarTarefa,
            descricao,
            idProjeto,
            projetos
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