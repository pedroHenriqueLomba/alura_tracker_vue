<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Editar tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="descricaoTarefa">
                        Descrição da tarefa
                    </label>
                    <input type="text" class="input" id="descricaoTarefa" v-model="descricaoTarefa">
                </div>
            </section>
            <footer class="modal-card-foot">
                <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
                <button @click="fecharModal" class="button">Cancelar</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/ITarefa';
import { useStore } from '@/store';
import { ALTERAR_TAREFA } from '@/store/tiposAcoes';
import { PropType, defineComponent } from 'vue';
import useNotificador from "@/hooks/notificador"
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: "ModalEdicaoTarefa",
    data() {
        return {
            descricaoTarefa: this.tarefa.descricao
        }
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        fecharModal() {
            this.$emit('fecharModal')
        },
        alterarTarefa() {
            const tarefaAtualizada = {
                id: this.tarefa.id,
                descricao: this.descricaoTarefa,
                tempoDeExecucao: this.tarefa.tempoDeExecucao,
                projeto: this.tarefa.projeto
            }
            this.store.dispatch(ALTERAR_TAREFA, tarefaAtualizada)
                .then(() => {
                    this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'Projeto atualizado com sucesso')
                    this.$emit('fecharModal');
                });
        }
    },
    emits: ['fecharModal'],
    setup() {
        const store = useStore();
        const { notificar } = useNotificador()

        return {
            store,
            notificar
        }
    }
})
</script>

<style scoped></style>