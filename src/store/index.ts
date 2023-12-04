import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ADICIONAR_NOTIFICACAO } from './tiposMutations';
import { INotificacao } from '@/interfaces/INotificacao';
import { EstadoProjeto, projeto } from './modulos/projetos';
import { EstadoTarefa, tarefa } from './modulos/tarefas';

export interface Estado {
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa,
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefa: {
            tarefas: []
        },
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [ADICIONAR_NOTIFICACAO](state, notificacao: INotificacao) {
            notificacao.id = new Date().toISOString();
            state.notificacoes.push(notificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter((noti) => noti.id !== notificacao.id)
            }, 2500)
        }
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore() {
    return vuexUseStore(key)
}