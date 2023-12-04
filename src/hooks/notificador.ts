import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { ADICIONAR_NOTIFICACAO } from "@/store/tiposMutations"

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default (): Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
        store.commit(ADICIONAR_NOTIFICACAO, {
            tipo: tipo,
            titulo: titulo,
            texto: texto
        })
    }

    return {
        notificar
    }
}