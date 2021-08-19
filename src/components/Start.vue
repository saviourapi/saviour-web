<template>
  <v-container>
    <div class="text-center">
      <v-container>
        <iframe
          src="https://www.youtube.com/embed/jS95n3DCZTM?start=1"
          title="How Artificial Intelligence and Machine Learning impacting Oil and Gas Industry | AIBridge ML"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="videoSize"
        ></iframe>
        <div>
          <p>
            <strong> Autor: </strong>
            <a
              href="https://www.youtube.com/channel/UCBAWZObk3gS40SfikipszdA"
              target="_blank"
            >
              AIBridge ML
            </a>
          </p>
        </div>
      </v-container>
    </div>

    <p class="text-justify">
      Trabajado en lenguaje de programación
      <strong>Python y abierto a todo el mundo</strong>, esta aplicación te
      ayudará a nivel profesional a contrastar resultados de otros softwares y/o
      en proyectos académicos. Aplicativo web, construido en base de fundamentos
      de ciencia de datos y aprendizaje automatizado, y entrenado con
      información del campo Volve (Noruega) brindada por la empresa Equinor.
    </p>
    <p class="text-justify">
      El objetivo de Saviour es trabajar con los datos entregados para poder
      adaptar un comportamiento de la producción de petróleo y realizar
      predicciones con valores de precisión muy buenos. Saviour te presenta dos
      modelos muy precisos para la data con la que fue entrenado, que tú también
      puedes emplear para realizar tus predicciones, el primero es el algoritmo
      de Regresión Polinomial y el segundo es el algoritmo de Random Forest.
    </p>
    <p class="text-justify">
      La importancia de poder conocer la tasa de producción es grande, pues nos
      permite realizar análisis técnico-económicos a futuro, y a prever
      situaciones adversas o tener información importante como por ejemplo saber
      hasta qué fecha es rentable producir o si es necesario en algún punto
      implementar algún mecanismo de recuperación secundaria o terciaria al pozo
      o yacimiento.
    </p>
    <div class="mb-3">
      <strong>By:</strong>
      <ul>
        <li>
          Luis Alchundia
          <a
            href="https://www.linkedin.com/in/luis-alchundia-117b78210"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
        <li>
          Darío Hernández
          <a href="https://www.linkedin.com/in/antdhern/" target="_blank">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>

    <v-divider class="my-5"></v-divider>
    <tabs-pages></tabs-pages>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import TabsPages from "./TabsPages.vue";

export default Vue.extend({
  name: "start",
  components: {
    TabsPages,
  },
});
</script>

<style>
@media (max-width: 450px) {
  .videoSize {
    width: 100%;
    height: 100%;
  }
}
@media (min-width: 450px) {
  .videoSize {
    height: 215px;
    width: 400px;
  }
}
@media (min-width: 605px) {
  .videoSize {
    height: 315px;
    width: 560px;
  }
}
</style>
