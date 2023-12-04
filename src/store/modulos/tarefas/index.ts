import http from "@/http"
import ITarefa from "@/interfaces/ITarefa"
import { Estado } from "@/store"
import { OBTER_TAREFAS, CADASTRAR_TAREFA } from "@/store/tiposAcoes"
import { DEFINIR_TAREFAS, ADICIONAR_TAREFA, ALTERAR_TAREFA } from "@/store/tiposMutations"
import { Module } from "vuex"

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ALTERAR_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tar => tar.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas'
            if (filtro){
                url += "?descricao=" + filtro
            }

            return http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa)
                .then((resposta) => commit(ADICIONAR_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa)
                .then((resposta) => commit(ALTERAR_TAREFA, resposta.data));
        },
    },
}