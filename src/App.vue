<template>
  <v-app standalone class="app" id="app">
    <v-toolbar  class="green" dark></v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
     <v-footer class="pa-3" >
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  
}
</script>

<style scoped>
</style>
