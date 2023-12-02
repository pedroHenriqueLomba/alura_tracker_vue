<template>
    <section >
        <strong class="display">{{ tempoTratado }}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CronometroTarefa",
    props: {
        tempoEmSegundos: {type: Number, default: 0}
    },
    computed: {
        tempoTratado(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 19)
        }
    }
})
</script>

<style>
.display {
    color: var(--texto-primario);
}
</style>