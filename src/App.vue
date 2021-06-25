<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-avatar>
            <v-avatar
              color="blue darken-4"
              size="42"
              class="white--text"
            >SD
            </v-avatar>
          </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title >Saúl Díez Fernández </v-list-item-title>
          <v-list-item-subtitle>TFM - RIASC </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-variant-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :href="'https://github.com/SaulDiez/Dashboard_IoT_devices'" target="_blank">
          <v-list-item-icon>
            <v-icon>mdi-github</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Repositorio<v-icon
                right
              >
                mdi-open-in-new
              </v-icon></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      src="https://www.simplilearn.com/ice9/free_resources_article_thumb/iot_devices.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        ></v-img>
      </template>

      <v-app-bar-title>Descubrimiento de dispositivos</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon :href="'https://github.com/SaulDiez/Dashboard_IoT_devices'" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension> </template>
    </v-app-bar>

    <!--  SIMPLE  <v-app-bar app>
      <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
          <span>Vuetify </span>
          <span class="font-weight-light">Descubrimiento de dispositivos</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>
            <router-link to="/">Home</router-link>
          </v-btn>
          <v-btn flat>
            <router-link to="/about">About</router-link>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
    -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      //
    };
  },
};
</script>