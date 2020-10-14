<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar rounded>
            <img src="./../assets/amazon-web-services-cloud.svg" />
          </q-avatar>
          Ejercicios Prácticos
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Inicio" />
        <q-route-tab to="/chat" label="Chat" />
        <q-route-tab to="/geo" label="Geolocalización" />
        <q-route-tab to="/funciones" label="Funciones Agregación" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  }
};
</script>
