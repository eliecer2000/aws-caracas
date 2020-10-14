<template>
  <q-page class="flex flex-center">
    <div class="full-width row wrap justify-start items-center content-center">
      <div class="col-5 q-pa-lg">
        <div class="row full-width">
          <div class="col-12">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="nombre"
                label="Nombre del Item"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'El campo es requerido'
                ]"
              />

              <q-input
                filled
                type="number"
                v-model="precio"
                label="Precio $"
                lazy-rules
                :rules="[
                  val =>
                    (val !== null && val !== '') || 'El campo es requerido',
                  val => val > 0 || 'El precio no puede ser mayor a 0'
                ]"
              />

              <div class="q-pa-lg q-mx-auto q-my-none full-width text-center">
                <q-rating
                  v-model="rank"
                  max="7"
                  size="3em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  no-dimming
                />
              </div>

              <div>
                <q-btn label="Guardar" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </div>
        <div class="row full-width q-pa-xl">
          <div class="col-12">
            <q-input
              stack-label
              v-model="sum"
              type="number"
              label="Valor Suma de los precios"
              lazy-rules
              readonly
            />
            <q-input
              stack-label
              v-model="max"
              type="number"
              label="Valor Maximo de los precios"
              lazy-rules
              readonly
            />
            <q-input
              stack-label
              v-model="min"
              type="number"
              label="Valor Minimo de los precios"
              lazy-rules
              readonly
            />
            <q-input
              stack-label
              v-model="avg_rango"
              type="number"
              label="Valor Average de Rango"
              lazy-rules
              readonly
            />
          </div>
        </div>
      </div>
      <div class="col-7 q-pa-lg">
        <q-table
          title="Funciones de Agregación"
          :data="data"
          :columns="columns"
          row-key="name"
          class="height-desktop"
          separator="vertical"
          :loading="loading"
          :rows-per-page-options="[0]"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./../aws-exports";
Amplify.configure(awsconfig);

import { createDatos } from "./../graphql/mutations";

import { searchDatoss } from "./../graphql/queries";

import { onCreateDatos } from "./../graphql/subscriptions";

export default {
  name: "funcionesPage",
  data() {
    return {
      loading: false,
      nombre: null,
      precio: null,
      max: 0,
      min: 0,
      avg_rango: 0.0,
      sum: 0.0,
      rank: 0,
      columns: [
        {
          name: "descripcion",
          required: true,
          label: "Articulo",
          align: "left",
          field: row => row.descripcion,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "monto",
          label: "Precio",
          field: "monto",
          sortable: true
        },
        {
          name: "rango",
          label: "Rango",
          field: "rango",
          sortable: true
        }
      ],
      data: []
    };
  },
  mounted() {
    this.ListarItems();
  },
  methods: {
    async grabaItem() {
      const todo = {
        descripcion: this.nombre,
        monto: this.precio,
        rango: this.rank
      };
      const dataUser = await API.graphql(
        graphqlOperation(createDatos, { input: todo })
      );
      setTimeout(async () => {
        await this.ListarItems();
      }, 3000);
    },
    async ListarItems() {
      let variables = {
        id: { wildcard: "*" }
      };
      let opciones = {
        limit: 1000,
        filter: variables
      };
      const dataMensajes = await API.graphql(graphqlOperation(searchDatoss));
      console.log("TCL: ListarItems -> dataMensajes", dataMensajes);
      this.data = dataMensajes.data.searchDatoss.items;
      this.max = dataMensajes.data.searchDatoss.max;
      this.min = dataMensajes.data.searchDatoss.min;
      this.sum = dataMensajes.data.searchDatoss.sum;
      this.avg_rango = dataMensajes.data.searchDatoss.totalAveg;
    },
    async onSubmit() {
      await this.grabaItem();
      await this.onReset();
      this.$q.notify({
        message: `Item Guardado`,
        color: "positive"
      });
    },

    onReset() {
      this.nombre = null;
      this.precio = null;
      this.rank = 0;
    }
  }
};
</script>

<style lang="sass">
.height-desktop
  height: calc(100vh - 190px);
</style>
