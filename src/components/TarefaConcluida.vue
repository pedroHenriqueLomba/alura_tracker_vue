<template>
    <BoxAmarela>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                <CronometroTarefa :tempo-em-segundos="tarefa.tempoDeExecucao" />
            </div>
        </div>
    </BoxAmarela>
</template>

<script lang="ts">
import { PropType } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxAmarela from './BoxAmarela.vue';

export default {
    name: 'TarefaConcluida',
    components: {
        CronometroTarefa,
        BoxAmarela
    },
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true }
    }
}
</script>

<style scoped></style>