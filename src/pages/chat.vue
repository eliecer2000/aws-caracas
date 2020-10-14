<template>
  <q-page class="flex flex-center">
    <div
      class="full-width row wrap justify-center items-center content-center"
      v-if="usuario"
    >
      <div class="col-3">
        <q-scroll-area
          class="full-width height-desktop bg-primary"
          ref="scrollArea2"
        >
          <q-list bordered separator class="full-width q-pa-lg">
            <q-item v-for="(item, index) in datosUsuarios" :key="item.id">
              <q-item-section>
                <q-item-label class="text-body1 text-weight-bold text-white">
                  <q-badge
                    v-if="item.id == usuario.id"
                    outline
                    align="middle"
                    color="white"
                    >Tú</q-badge
                  >
                  {{ item.name }}
                </q-item-label>
              </q-item-section>
              <q-item-section side top v-if="item.id !== usuario.id">
                <q-btn
                  color="white"
                  v-if="!item.suscripcion"
                  text-color="dark"
                  icon="hearing"
                  @click="escuchar(index, true)"
                >
                </q-btn>
                <q-btn
                  color="white"
                  v-if="item.suscripcion"
                  text-color="dark"
                  icon="hearing_disabled"
                  @click="escuchar(index, false)"
                >
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <div class="col-9">
        <q-scroll-area class="full-width height-desktop" ref="scrollArea">
          <q-list class="full-width q-pa-lg">
            <q-item v-for="item in datos" :key="item.id">
              <q-item-section>
                <q-item-label>
                  <q-badge
                    v-if="item.usuario.id === usuario.id"
                    align="middle"
                    color="primary"
                    >Tú</q-badge
                  >
                  [ {{ item.usuario.name }} ]</q-item-label
                >
                <q-item-label caption>{{ item.mensaje }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>
                  {{ date.formatDate(item.createdAt, "DD/MM/YYYY HH:mm:ss") }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
    <div
      class="full-width row wrap justify-center items-center content-center"
      v-if="usuario"
    >
      <q-form
        ref="myForm"
        @reset="onReset"
        @submit="grabaMensaje"
        class="q-gutter-md full-width q-pa-md"
      >
        <q-input
          name="mensaje"
          v-model="mensaje"
          color="primary"
          label="Escribe tu mensaje"
          clearable
        />
        <div>
          <q-btn
            label="Enviar"
            no-caps
            :disable="!this.mensaje"
            type="submit"
            color="primary"
          />
        </div>
        <div>
          <q-btn
            @click="cerrarSesion"
            label="Cerrar Sesión"
            no-caps
            color="accent"
          />
        </div>
      </q-form>
    </div>
    <div v-else>
      <div class="row">
        <q-img src="~assets/no-group.png"> </q-img>
      </div>
      <div class="row">
        <span class="text-h6 q-pa-xl q-ma-lg"
          >No existe usuario configurado</span
        >
      </div>
      <div class="row text-center q-mx-auto q-my-none">
        <q-btn
          @click="nuevoUsuario"
          no-caps
          label="Crear Usuario"
          color="primary"
          class="full-width"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./../aws-exports";
Amplify.configure(awsconfig);

import { date } from "quasar";

import { createMensajes, createUsuarios } from "./../graphql/mutations";

import { listMensajess, listUsuarioss } from "./../graphql/queries";

import {
  onCreateMensajes,
  onCreateUsuarios,
  onCreateMensajesPrivados
} from "./../graphql/subscriptions";

export default {
  name: "Page1",
  data() {
    return {
      usuario: "",
      datos: [],
      datosUsuarios: [],
      date: date,
      mensaje: "",
      subscription: null,
      subscription2: null
    };
  },
  created() {
    this.$date = date;
  },
  mounted() {
    this.usuario = this.$q.localStorage.getItem("usuario");
    if (this.usuario) {
      this.InitFunc();
    }
  },
  methods: {
    nuevoUsuario() {
      this.$q
        .dialog({
          title: "Crear Usuario",
          message: "Cual es tu nombre?",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.grabaUsuario(data);
          // console.log('>>>> OK, received', data)
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    onReset() {
      this.mensaje = null;
    },
    cerrarSesion() {
      this.usuario = "";
      this.datos = [];
      this.mensaje = "";
      this.$q.localStorage.remove("usuario");
    },

    InitFunc() {
      this.ListarMensajes();
      this.ListarUsuarios();
      this.suscribe();
      this.suscribe2();
      this.$refs.scrollArea.setScrollPercentage(10000000, 300);
    },

    escuchar(a, b) {
      console.log("TCL: escuchar -> a, b", a, b, this.datosUsuarios[a]);
      const self = this;
      if (b) {
        this.datosUsuarios[a].suscripcion = API.graphql(
          graphqlOperation(onCreateMensajesPrivados, {
            idUsuario: this.datosUsuarios[a].id
          })
        ).subscribe({
          next: todoData => {
            console.log(
              "TCL: suscribePrivado -> todoData",
              todoData.value.data.onCreateMensajesPrivados.usuario.name
            );
            self.$q.notify({
              caption: todoData.value.data.onCreateMensajesPrivados.mensaje,

              message:
                "[ " +
                todoData.value.data.onCreateMensajesPrivados.usuario.name +
                " ]",
              color: "primary",
              multiLine: true,
              avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
              actions: [
                {
                  label: "Responder",
                  color: "white",
                  handler: () => {
                    /* ... */
                  }
                }
              ]
            });
          }
        });
      } else {
        this.datosUsuarios[a].suscripcion.unsubscribe();
        this.datosUsuarios[a].suscripcion = null;
      }
    },

    async grabaUsuario(a) {
      const todo = { name: a };
      const dataUser = await API.graphql(
        graphqlOperation(createUsuarios, { input: todo })
      );
      this.$q.localStorage.set("usuario", dataUser.data.createUsuarios);
      this.usuario = dataUser.data.createUsuarios;
      this.InitFunc();
    },
    async ListarMensajes() {
      const dataMensajes = await API.graphql(graphqlOperation(listMensajess));
      this.datos = dataMensajes.data.listMensajess.items;
      this.$refs.scrollArea.setScrollPercentage(10000000, 300);
    },
    async ListarUsuarios() {
      const dataUsuarios = await API.graphql(graphqlOperation(listUsuarioss));
      dataUsuarios.data.listUsuarioss.items.forEach(element => {
        element.suscripcion = null;
        this.datosUsuarios.push(element);
      });
    },

    async suscribe() {
      this.subscription = API.graphql(
        graphqlOperation(onCreateMensajes)
      ).subscribe({
        next: todoData => {
          this.datos.push(todoData.value.data.onCreateMensajes);
          this.$refs.scrollArea.setScrollPercentage(100, 300);
        }
      });
    },

    async suscribe2() {
      this.subscription2 = API.graphql(
        graphqlOperation(onCreateUsuarios)
      ).subscribe({
        next: todoData => {
          this.autoClose(todoData.value.data.onCreateUsuarios.name);
        }
      });
    },

    async grabaMensaje() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          if (!this.mensaje) {
            return;
          }
          const todo = { idUsuario: this.usuario.id, mensaje: this.mensaje };
          API.graphql(graphqlOperation(createMensajes, { input: todo }));
          this.mensaje = "";
          this.$refs.myForm.resetValidation();
        } else {
          // oh no, user has filled in
          // at least one invalid value
        }
      });
    },

    autoClose(arg) {
      this.$q.notify({
        message: `Acaba de Entrar ${arg}`,
        color: "purple"
      });
    }
  }
};
</script>
<style lang="sass">
.height-desktop
  height: calc(100vh - 290px);
</style>
