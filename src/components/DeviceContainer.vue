<!-- virtual scroller v-virtual-scroll para ver cves-->

<template>
  <v-container>
    <div>
      <v-banner single-line elevation="2" sticky icon="mdi-wifi">
        Buscar vulnerabilidades en dispositivos y servicios locales
        <template v-slot:actions>
          <v-btn @click="clickButton('pruebaEmit')">
            <v-icon :class="{ 'd-flex': progreHide, 'd-none': progreVisi }"
              >mdi-magnify
            </v-icon>
            <v-progress-circular
              class="d-none"
              :class="{ 'd-flex': progreVisi, 'd-none': progreHide }"
              :width="2"
              indeterminate
              size="20"
            ></v-progress-circular>
          </v-btn>
        </template>
      </v-banner>
    </div>

    <v-card
      class="float-left justify ma-4"
      height="365"
      width="700"
      v-for="(item, index) in servicios.dispositivosUPNP"
      :key="item.id"
    >
      <v-toolbar flat color="blue darken-3" dark>
        <v-toolbar-title>Perfil UPnP - {{ servicios.dispositivosUPNP[index].IPv4 }} - {{ servicios.dispositivosUPNP[index].normalName }} - {{ servicios.dispositivosUPNP[index].normalVersion }}</v-toolbar-title>
      </v-toolbar>
      <v-tabs color="blue darken-3" vertical>
        <v-tab>
          <v-icon left> mdi-play-circle-outline </v-icon>
          Información
        </v-tab>
        <v-tab>
          <v-icon left> mdi-virus-outline </v-icon>
          Vulnerabilidades
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-simple-table dense height="260">
                <tbody>
                  <tr>
                    <td>Nombre</td>
                    <td>
                      {{ servicios.dispositivosUPNP[index].friendlyName }}
                    </td>
                  </tr>
                  <tr>
                    <td>Producto</td>
                    <td>
                      {{ servicios.dispositivosUPNP[index].modelDescription }}
                    </td>
                  </tr>
                  <tr>
                    <td>Nº Versión</td>
                    <td>{{ servicios.dispositivosUPNP[index].modelNumber }}</td>
                  </tr>
                  <tr>
                    <td>URL Producto</td>
                    <td><a :href="servicios.dispositivosUPNP[index].modelURL" target="_blank">
                      {{ servicios.dispositivosUPNP[index].modelURL }}</a>
                      </td>
                  </tr>
                  <tr>
                    <td>URL Servicio</td>
                    <td v-if="servicios.dispositivosUPNP[index].URLBase">
                      <a :href="servicios.dispositivosUPNP[index].URLBase + servicios.dispositivosUPNP[index].presentationURL" target="_blank">
                      {{ servicios.dispositivosUPNP[index].URLBase
                      }}{{ servicios.dispositivosUPNP[index].presentationURL }}</a>
                      
                    </td>
                    <td v-else>
                      <a :href="servicios.dispositivosUPNP[index].presentationURL" target="_blank">
                      {{ servicios.dispositivosUPNP[index].presentationURL }}</a>
                      
                    </td>
                  </tr>
                  <tr>
                    <td>ID Host</td>
                    <td
                      v-if="servicios.dispositivosUPNP[index].UDN"
                      class="black--text"
                    >
                      {{ servicios.dispositivosUPNP[index].UDN }}
                    </td>
                  </tr>
                  <tr>
                    <td>Fabricante</td>
                    <td>
                      {{ servicios.dispositivosUPNP[index].manufacturer }}
                    </td>
                  </tr>
                  <tr>
                    <td>URL Fabricante</td>
                    <td><a :href="servicios.dispositivosUPNP[index].manufacturerURL" target="_blank">
                      {{ servicios.dispositivosUPNP[index].manufacturerURL }}</a>
                    </td>
                  </tr>
                  <tr>
                    <td v-if="servicios.dispositivosUPNP[index].X_DLNADOC">
                      Versión DLNA
                    </td>
                    <td>{{ servicios.dispositivosUPNP[index].X_DLNADOC }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text v-if="servicios.dispositivosUPNP[index].cves.totalResults == '0'">
              <p v-if="servicios.dispositivosUPNP[index].cves.totalResults == '0'" class="font-weight-medium text-center">
                No se han encontrado vulnerabilidades
              </p>
            </v-card-text>
            <v-card-text v-else>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th>
                      ID CVE
                    </th>
                    <th>
                      Impacto
                    </th>
                    <th>
                      Detalles
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(itemV, indexV) in servicios.dispositivosUPNP[index].cves.result.CVE_Items"
              :key="itemV.id">
                    <td>{{ servicios.dispositivosUPNP[index].cves.result.CVE_Items[indexV].cve.CVE_data_meta.ID }}</td>
                    <td>
                      {{ servicios.dispositivosUPNP[index].cves.result.CVE_Items[indexV].impact.baseMetricV3.cvssV3.baseScore }}: 
                      {{ servicios.dispositivosUPNP[index].cves.result.CVE_Items[indexV].impact.baseMetricV3.cvssV3.baseSeverity }}
                    </td>
                    <td><v-btn :href="'https://nvd.nist.gov/vuln/detail/'+servicios.dispositivosUPNP[index].cves.result.CVE_Items[indexV].cve.CVE_data_meta.ID" target="_blank"
              depressed
              small
            >Ver CVE
              <v-icon
                color="orange darken-4"
                right
              >
                mdi-open-in-new
              </v-icon>
            </v-btn></td>
                    
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

    <v-card
      class="float-left justify ma-4"
      height="365"
      width="700"
      v-for="(item, index) in servicios.serviciosMDNS"
      :key="item.id"
    >
      <v-toolbar flat color="light-green darken-4" dark>
        <v-toolbar-title>Perfil mDNS</v-toolbar-title>
      </v-toolbar>
      <v-tabs color="light-green darken-4" vertical>
        <v-tab>
          <v-icon left> mdi-play-circle-outline </v-icon>
          Información
        </v-tab>
        <v-tab>
          <v-icon left> mdi-virus-outline </v-icon>
          Vulnerabilidades
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-simple-table dense height="260">
                <tbody>
                  <tr>
                    <td>Host IP</td>
                    <td>{{ servicios.serviciosMDNS[index].IPv4[0] }}</td>
                  </tr>
                  <tr>
                    <td>Nombre Servicio</td>
                    <td>{{ servicios.serviciosMDNS[index].Name }}</td>
                  </tr>
                  <tr>
                    <td>Nombre Host</td>
                    <td>{{ servicios.serviciosMDNS[index].Host }}</td>
                  </tr>
                  <tr>
                    <td>Tipo de Servicio</td>
                    <td>{{ servicios.serviciosMDNS[index].ServiceType }}</td>
                  </tr>
                  <tr v-if="servicios.serviciosMDNS[index].Addresses[1]">
                    <td>Dirección IPv6</td>
                    <td>{{ servicios.serviciosMDNS[index].Addresses[1] }}</td>
                  </tr>
                  <tr>
                    <td>Puerto del Servicio</td>
                    <td>{{ servicios.serviciosMDNS[index].Port }}</td>
                  </tr>
                  <tr v-if="servicios.serviciosMDNS[index].uuid">
                    <td>ID Host</td>
                    <td>{{ servicios.serviciosMDNS[index].uuid }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                aliquam libero, non adipiscing dolor urna a orci. Curabitur
                ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
                leo. Nunc sed turpis.
              </p>

              <p class="mb-0">
                Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In
                dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed,
                iaculis a, condimentum nec, nisi.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

    <v-card
      class="float-left justify ma-4"
      v-for="(item, index) in servicios.serviciosWSD"
      :key="item.id"
    >
      <v-toolbar flat color="brown darken-3" dark>
        <v-toolbar-title>User Profile</v-toolbar-title>
      </v-toolbar>
      <v-tabs color="brown darken-3" vertical>
        <v-tab>
          <v-icon left> mdi-play-circle-outline </v-icon>
          Dispositivo
        </v-tab>
        <v-tab>
          <v-icon left> mdi-virus-outline </v-icon>
          Vulnerabilidades
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>Host IP: {{ servicios.serviciosMDNS[index].IPv4[0] }}</p>
              <p>{{ servicios.serviciosMDNS[index].Name }}</p>
              <p>Nombre del host: {{ servicios.serviciosMDNS[index].Host }}</p>
              <p>
                Tipo de servicio:
                {{ servicios.serviciosMDNS[index].ServiceType }}
              </p>
              <p>
                Direcciones IP: {{ servicios.serviciosMDNS[index].Addresses }}
              </p>
              <p>
                Puerto del servicio: {{ servicios.serviciosMDNS[index].Port }}
              </p>
              <p v-if="servicios.serviciosMDNS[index].uuid">
                Identificador: {{ servicios.serviciosMDNS[index].uuid }}
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                aliquam libero, non adipiscing dolor urna a orci. Curabitur
                ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
                leo. Nunc sed turpis.
              </p>

              <p class="mb-0">
                Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In
                dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed,
                iaculis a, condimentum nec, nisi.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DeviceContainer",
  data() {
    return {
      servicios: 0,
      progreVisi: false,
      progreHide: true,
    };
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    customEmit(val) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
      this.servicios = val;
      this.progreVisi = false;
      this.progreHide = true;
      //this.crok=this.servicios.serviciosMDNS[0].ServiceType
    },
  },
  methods: {
    clickButton(val) {
      // this.$socket.client is `socket.io-client` instance
      this.progreVisi = true;
      this.progreHide = false;
      console.log("juas");
      this.$socket.client.emit("emit_method", val);
    },
  },
};
</script>
<!--<script>
import axios from 'axios'
export default {
  name: 'DeviceContainer',
  data () {
    return {
      mensaje: 'Sin mensaje!'
    }
  },
  methods: {
    getMensaje () {
      const path = 'http://localhost:5000/api'
      axios.get(path).then((respuesta) => {
        this.mensaje = respuesta.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getMensaje()
  }
}
</script>-->