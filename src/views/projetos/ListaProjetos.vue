<template>
    <section class="lista-projetos">
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </RouterLink>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <RouterLink :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </RouterLink>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import useNotificador from '@/hooks/notificador'
import { EXCLUIR_PROJETO } from '@/store/tiposMutations';
import { OBTER_PROJETOS } from '@/store/tiposAcoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'ListaProjeto',
    data() {
        return {
            nomeProjeto: "",
        }
    },
    setup() {
        const store = useStore();

        const { notificar } = useNotificador()

        store.dispatch(OBTER_PROJETOS)

        return {
            projetos: computed(() => store.state.projeto.projetos),
            store,
            notificar
        }
    },
    methods: {
        excluir(idProjeto: string): void {
            this.store.dispatch(EXCLUIR_PROJETO, idProjeto)
                .then(() => this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', "Projeto apagado com sucesso"));
        }
    }
})
</script>
  
<style scoped>
.lista-projetos table,
.lista-projetos table th,
.lista-projetos table td {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>
  