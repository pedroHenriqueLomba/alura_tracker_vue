import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { ADICIONAR_NOTIFICACAO } from "@/store/tiposMutations"

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string) {
            store.commit(ADICIONAR_NOTIFICACAO, {
                tipo: tipo,
                titulo: titulo,
                texto: texto
            })
        }
    }
}