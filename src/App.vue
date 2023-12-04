<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivado }">
    <div class="column is-one-quarter">
      <BarraLateral @alterar-tema="alterarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacaoGeral />
      <RouterView/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificacaoGeral from './components/NotificacaoGeral.vue';
import BarraLateral from "./components/BarraLateral.vue";

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    NotificacaoGeral
  },
  data() {
    return {
      modoEscuroAtivado: false
    }
  },
  methods: {
    alterarTema(modoEscuroAtivado: boolean) {
      this.modoEscuroAtivado = modoEscuroAtivado;
    }
  },
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
