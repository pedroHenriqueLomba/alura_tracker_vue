<template>
    <div class="notificacao">
        <article v-for="notificacao in notificacoes" :key="notificacao.id" :class="`message is-${contexto[notificacao.tipo]}`" >
            <div class="message-header">
                <p>{{ notificacao.titulo }}</p>
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'NotificacaoGeral',
    data() {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'success',
                [TipoNotificacao.FALHA]: 'danger',
                [TipoNotificacao.ATENCAO]: 'warning'
            }
        }
        
    },
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacao {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 10;
}
</style>