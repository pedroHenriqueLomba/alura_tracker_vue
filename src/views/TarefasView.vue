<template>
    <Formulario @terminar-tarefa="salvarTarefa($event)" />
    <div class="lista">
        <TarefaConcluida v-for="(tarefa, index) in store.state.tarefas" :key="index" :tarefa="tarefa" />
        <BoxAmarela v-if="listaVazia">
            Não existem tarefas cadastradas :(
        </BoxAmarela>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TarefaConcluida from '../components/TarefaConcluida.vue';
import Formulario from '../components/Formulario.vue';
import BoxAmarela from '../components/BoxAmarela.vue';
import type ITarefa from '../interfaces/ITarefa';
import { useStore } from '@/store';
import { ADICIONAR_TAREFA } from '@/store/tiposMutations';


export default defineComponent({
    name: 'TarefasView',
    components: {
        TarefaConcluida,
        BoxAmarela,
        Formulario
    },
    data() {
        return {
            modoEscuroAtivado: false
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.commit(ADICIONAR_TAREFA, tarefa)
        }
    },
    computed: {
        listaVazia(): boolean {
            return this.store.state.tarefas.length === 0;
        }
    },
    setup(){
        const store = useStore();

        return {
            store
        }
    }
});
</script>
  
  