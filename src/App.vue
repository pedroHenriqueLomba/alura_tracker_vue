<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivado }">
    <div class="column is-one-quarter">
      <BarraLateral @alterar-tema="alterarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @terminar-tarefa="salvarTarefa($event)" />
      <div class="lista">
        <TarefaConcluida v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxAmarela v-if="listaVazia">
          Não existem tarefas cadastradas :(
        </BoxAmarela>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "./components/BarraLateral.vue";
import Formulario from "./components/Formulario.vue";
import TarefaConcluida from './components/TarefaConcluida.vue';
import BoxAmarela from './components/BoxAmarela.vue';
import type ITarefa from './interfaces/ITarefa'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    TarefaConcluida,
    BoxAmarela
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivado: false
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
    alterarTema(modoEscuroAtivado: boolean) {
      this.modoEscuroAtivado = modoEscuroAtivado;
    }
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #FFF;
  --texto-primario: #000
}

main.modo-escuro {
  --bg-primario: #2B2D42;
  --texto-primario: #DDD;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
