<template>
  <div class="row">
    <div class="col-6 row-border">
      <div class="q-pa-md q-gutter-md float-left">
        <q-btn
          label="Reset"
          color="primary"
          class="float-left zI"
          @click="resetMarker1"
        ></q-btn>
      </div>
      <GmapMap
        ref="mapa"
        :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          animatedZoom: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: true,
          clickableIcons: false,
          disableDoubleClickZoom: true,
          minZoom: 9,
          styles: style,
          draggable: true,
          scrollwheel: true,
          disableDoubleClickZoom: true
        }"
        :center="center"
        :zoom="zoom"
        @zoom_changed="resize($event)"
        @click="addMarkers"
        map-type-id="roadmap"
        style="width: 100%; min-height: calc( 100vh - 110px)"
      >
        <gmap-custom-marker
          v-for="(m, index) in markers"
          :key="index"
          :marker="m.position"
        >
          <q-img src="~assets/start.svg" style="width: 30px;" />
        </gmap-custom-marker>
      </GmapMap>
    </div>
    <div class="col-6 row-border">
      <div class="q-pa-md q-gutter-md float-left">
        <q-btn
          label="Reset"
          color="primary"
          v-if="marker.lat"
          class="float-left zI"
          @click="resetMarker2"
        ></q-btn>
        <q-btn
          label="Calcular a 100m"
          color="primary"
          no-caps
          v-if="marker.lat"
          class="float-left zI"
          @click="filtro(100)"
        ></q-btn>
        <q-btn
          label="Calcular a 500m"
          no-caps
          color="primary"
          v-if="marker.lat"
          class="float-left zI"
          @click="filtro(500)"
        ></q-btn>
        <q-btn
          no-caps
          label="Calcular a 1Km"
          v-if="marker.lat"
          color="primary"
          class="float-left zI"
          @click="filtro(1000)"
        ></q-btn>
        <q-btn
          no-caps
          label="Calcular a 5Km"
          v-if="marker.lat"
          color="primary"
          class="float-left zI"
          @click="filtro(5000)"
        ></q-btn>
      </div>

      <GmapMap
        :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          animatedZoom: true,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: true,
          clickableIcons: false,
          disableDoubleClickZoom: true,
          minZoom: 9,
          styles: style,
          draggable: true,
          scrollwheel: true,
          disableDoubleClickZoom: true
        }"
        :center="center"
        :zoom="zoom"
        @zoom_changed="resize($event)"
        map-type-id="roadmap"
        @click="addMarker"
        style="width: 100%; min-height: calc( 100vh - 110px)"
      >
        <gmap-custom-marker :marker="marker">
          <img src="~assets/end.svg" style="width: 30px;" />
        </gmap-custom-marker>
        <gmap-custom-marker
          v-for="(m2, index) in markers2"
          :key="index"
          :marker="m2.position"
        >
          <q-img src="~assets/start.svg" style="width: 30px;">
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              {{ m2.name + " - Distancia: " + m2.distancia }}
            </q-tooltip>
          </q-img>
        </gmap-custom-marker>
        <gmap-custom-marker
          v-for="m in markers"
          :key="m.id"
          :marker="m.position"
        >
          <q-img src="~assets/pin.png" style="width: 20px;"> </q-img>
        </gmap-custom-marker>
      </GmapMap>
    </div>
  </div>
</template>

<script>
import GmapCustomMarker from "vue2-gmap-custom-marker";
import VueGeolocation from "vue-browser-geolocation";
import { gmapApi } from "vue2-google-maps";
import { style } from "./../boot/google.style.js";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./../aws-exports";
Amplify.configure(awsconfig);

import { listGeoPoints, pointStations } from "./../graphql/queries";
import { createGeoPoint, deleteGeoPoint } from "./../graphql/mutations";
import { onCreateGeoPoint } from "./../graphql/subscriptions";

export default {
  components: {
    "gmap-custom-marker": GmapCustomMarker
  },
  computed: {
    google: gmapApi
  },
  data() {
    return {
      style,
      zoom: 16,
      center: { lat: 10, lng: 10 },
      geo: VueGeolocation,
      markers: [],
      markers2: [],
      marker: { lat: 0, lng: 0 }
    };
  },
  mounted() {
    this.geo
      .getLocation({
        enableHighAccuracy: true, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0
      })
      .then(coordinates => {
        this.center = {
          lat: coordinates.lat,
          lng: coordinates.lng
        };
      });
    this.suscribe();
    this.listMarkers();
  },
  methods: {
    async suscribe() {
      this.subscription = API.graphql(
        graphqlOperation(onCreateGeoPoint)
      ).subscribe({
        next: todoData => {
          console.log(
            "TCL: suscribe -> todoData",
            todoData.value.data.onCreateGeoPoint
          );
          this.markers.push({
            name: todoData.value.data.onCreateGeoPoint.name,
            id: todoData.value.data.onCreateGeoPoint.id,
            distancia: 0,
            position: {
              lat: todoData.value.data.onCreateGeoPoint.location.lat,
              lng: todoData.value.data.onCreateGeoPoint.location.lon
            }
          });
        }
      });
    },
    async listMarkers() {
      const dataMarker = await API.graphql(graphqlOperation(listGeoPoints));
      dataMarker.data.listGeoPoints.items.forEach(element => {
        this.markers.push({
          id: element.id,
          name: element.name,
          distancia: element.distancia,
          position: {
            lat: element.location.lat,
            lng: element.location.lon
          }
        });
      });
    },
    async addMarkers(a) {
      console.log(a.latLng.lat(), a.latLng.lng());
      const todo = {
        name: "Punto " + this.markers.length,
        location: {
          lat: a.latLng.lat(),
          lon: a.latLng.lng()
        }
      };
      const dataUser = await API.graphql(
        graphqlOperation(createGeoPoint, { input: todo })
      );
    },
    async removeMarkers() {
      this.markers.forEach(element => {
        API.graphql(
          graphqlOperation(deleteGeoPoint, { input: { id: element.id } })
        );
      });
      console.log("Elementos borrados");
      this.markers = [];
    },
    addMarker(a) {
      this.marker = { lat: a.latLng.lat(), lng: a.latLng.lng() };
    },
    resize(a) {
      this.zoom = a;
    },
    resetMarker1() {
      this.removeMarkers();
    },
    resetMarker2() {
      this.marker = { lat: 0, lng: 0 };
      this.markers2 = [];
    },
    async filtro(a) {
      console.log("TCL: filtro -> a", a);
      this.markers2 = [];
      const todo = {
        limit: 1000,
        m: a,
        location: {
          lat: this.marker.lat,
          lon: this.marker.lng
        }
      };
      const dataMarker = await API.graphql(
        graphqlOperation(pointStations, todo)
      );
      console.log("TCL: filtro -> dataMarker", dataMarker);
      dataMarker.data.PointStations.items.forEach(element => {
        this.markers2.push({
          id: element.id,
          name: element.name,
          distancia: element.distancia,
          position: {
            lat: element.location.lat,
            lng: element.location.lon
          }
        });
      });
    }
  }
};
</script>

<style>
.row-border {
  border: 5px solid #e89200;
}
.zI {
  z-index: 99999999 !important;
}
</style>
