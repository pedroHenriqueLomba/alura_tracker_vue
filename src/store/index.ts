import { InjectionKey } from 'vue'
import type IProjeto from '../interfaces/IProjeto'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO, ADICIONAR_TAREFA, ADICIONAR_NOTIFICACAO } from './tiposMutations';
import ITarefa from '@/interfaces/ITarefa';
import { INotificacao } from '@/interfaces/INotificacao';

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONAR_PROJETO](state, nomeProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto
            state.projetos.push(projeto);
        },
        [ALTERAR_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, idProjeto: string){
            state.projetos = state.projetos.filter((proj) => proj.id !== idProjeto);
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ADICIONAR_NOTIFICACAO](state, notificacao: INotificacao){
            notificacao.id = new Date().toISOString();
            state.notificacoes.push(notificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter((noti) => noti.id !== notificacao.id)
            }, 2500)
        }
    }
})

export function useStore() {
    return vuexUseStore(key)
}