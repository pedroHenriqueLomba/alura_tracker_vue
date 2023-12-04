<template>
    <Formulario @terminar-tarefa="salvarTarefa($event)" />
    <div class="lista">
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <TarefaConcluida @ao-tarefa-clicada="abrirModal($event)" v-for="(tarefa, index) in tarefas" :key="index"
            :tarefa="tarefa" />
        <BoxAmarela v-if="listaVazia">
            Não existem tarefas cadastradas :(
        </BoxAmarela>
        <ModalEdicaoTarefa v-if="abrirModalEdicao" @fechar-modal="fecharModal" :tarefa="tarefaEdicao" />
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import TarefaConcluida from '../components/TarefaConcluida.vue';
import Formulario from '../components/Formulario.vue';
import BoxAmarela from '../components/BoxAmarela.vue';
import type ITarefa from '../interfaces/ITarefa';
import { useStore } from '@/store';
import { CADASTRAR_TAREFA, OBTER_TAREFAS } from '@/store/tiposAcoes';
import ModalEdicaoTarefa from '@/components/ModalEdicaoTarefa.vue';

export default defineComponent({
    name: 'TarefasView',
    components: {
        TarefaConcluida,
        BoxAmarela,
        Formulario,
        ModalEdicaoTarefa
    },
    data() {
        return {
            modoEscuroAtivado: false,
            tarefaEdicao: {} as ITarefa
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        abrirModal(tarefa: ITarefa) {
            this.tarefaEdicao = tarefa;
        },
        fecharModal() {
            this.tarefaEdicao = {} as ITarefa
        }
    },
    computed: {
        listaVazia(): boolean {
            if (this.tarefas != undefined) {
                return this.tarefas.length == 0;
            } else {
                return false;
            }
        },
        abrirModalEdicao(): boolean {
            return this.tarefaEdicao.id !== undefined
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);

        const filtro = ref("");

        // const tarefas = computed(() =>
        //     store.state.tarefa.tarefas.filter(
        //         (tarefa) => {
        //             return !filtro.value || tarefa.descricao.includes(filtro.value)
        //         })
        // );

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            store,
            tarefas: computed(() => store.state.tarefa.tarefas),
            filtro
        }
    }
});
</script>
  
  