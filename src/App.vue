<template>
  <v-app dark>
    <sidebar></sidebar>
    <toolbar></toolbar>
    <v-snackbar v-model="snackbar"> Un ami a ajouté une vidéo favorie
        <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>

    
  <navigation></navigation>

  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'
import Navigation from '@/components/Navigation'

import {Store} from '@/Store.js'

export default {
  name: 'app',
  components: {sidebar: Sidebar, toolbar: Toolbar, navigation: Navigation},
  data(){
    return {
      snackbar: false
    }
  },
  sockets:{
    liked: function(val){
      this.snackbar = true;
    }
  }
}
</script>

<style>
  .input-group__details:after{
    background-color: white;
    height: 1px;
  }
  main{
  }
  #footer{
  }
  #container{
    height: 600px;
    overflow: auto;
  }
</style>
