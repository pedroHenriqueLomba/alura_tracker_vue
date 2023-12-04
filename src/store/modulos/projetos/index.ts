import http from "@/http"
import IProjeto from "@/interfaces/IProjeto"
import { Estado } from "@/store"
import { OBTER_PROJETOS, CADASTRAR_PROJETO } from "@/store/tiposAcoes"
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tiposMutations"
import { Module } from "vuex"

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
        [EXCLUIR_PROJETO](state, idProjeto: string) {
            state.projetos = state.projetos.filter((proj) => proj.id !== idProjeto);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            return http.get('projetos')
                .then(resposta => {
                    commit(DEFINIR_PROJETOS, resposta.data);
                });

        },
        [CADASTRAR_PROJETO](contexto, nomeProjeto: string) {
            return http.post('projetos', {
                nome: nomeProjeto,
            });
        },
        [ALTERAR_PROJETO]({ commit }, projeto: IProjeto) {
            return http.put(`projetos/${projeto.id}`, projeto)
                .then((resposta) => commit(ALTERAR_PROJETO, resposta.data));
        },
        [EXCLUIR_PROJETO]({ commit }, idProjeto: string) {
            return http.delete(`projetos/${idProjeto}`)
                .then(() => commit(EXCLUIR_PROJETO, idProjeto))
        },
    }
}