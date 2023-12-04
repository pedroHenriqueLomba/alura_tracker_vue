<template>
  <section>
    <form @submit.prevent="salvarProjeto">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do projeto
        </label>
        <input type="text" class="input" v-model="nomeProjeto" id="nomeProjeto">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { ALTERAR_PROJETO } from '@/store/tiposMutations';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from "@/hooks/notificador"
import { CADASTRAR_PROJETO } from '@/store/tiposAcoes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormularioProjeto',
  props: {
    id: String
  },
  setup(props) {
    const router = useRouter()

    const store = useStore()
    const { notificar } = useNotificador();

    const nomeProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)

      nomeProjeto.value = projeto?.nome || '';
    }

    const salvarProjeto = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, {
          id: props.id,
          nome: nomeProjeto.value
        }).then(() => lidarComSucesso('Projeto atualizado com sucessso', 'Sucesso'))
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeProjeto.value)
          .then(() => lidarComSucesso('Projeto cadastrado com sucessso', 'Sucesso'))
      }
    }

    const lidarComSucesso = (texto: string, titulo: string): void => {
      nomeProjeto.value = "";
      notificar(TipoNotificacao.SUCESSO, titulo, texto)
      router.push('/projetos');
    }

    return {
      store,
      notificar,
      nomeProjeto,
      salvarProjeto,
      lidarComSucesso
    }
  },
})
</script>

<style scoped>
.field label {
  color: var(--texto-primario);
}
</style>
