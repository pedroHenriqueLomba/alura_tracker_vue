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
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ADICIONAR_PROJETO, ALTERAR_PROJETO } from '@/store/tiposMutations';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from "@/hooks/notificador"

export default defineComponent({
  name: 'FormularioProjeto',
  data() {
    return {
      nomeProjeto: "",
    }
  },
  methods: {
    salvarProjeto() {
      if (this.id) {
        this.store.commit(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeProjeto
        })
      } else {
        this.store.commit(ADICIONAR_PROJETO, this.nomeProjeto);
      }
      this.nomeProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'Projeto cadastrado com sucesso')
      this.$router.push('/projetos');
    },
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador();
    return {
      store,
      notificar
    }
  },
  props: {
    id: String
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id === this.id)
      this.nomeProjeto = projeto?.nome || '';
    }
  }
})
</script>

<style scoped></style>
