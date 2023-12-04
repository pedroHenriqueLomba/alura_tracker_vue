<template>
    <BoxAmarela>
        <div class="columns tarefa" @click="tarefaClicada">
            <div class="column is-5">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || "N/D" }}
            </div>
            <div class="column">
                <CronometroTarefa :tempo-em-segundos="tarefa.tempoDeExecucao" />
            </div>
        </div>
    </BoxAmarela>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxAmarela from './BoxAmarela.vue';

export default defineComponent({
    name: 'TarefaConcluida',
    components: {
        CronometroTarefa,
        BoxAmarela
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    setup(props, { emit }) {
        const tarefaClicada = (): void => {
            emit('aoTarefaClicada', props.tarefa)
        }

        return {
            tarefaClicada
        }
    }
})
</script>

<style scoped>
.tarefa {
    cursor: pointer;
}
</style>