<template>
  <v-app dark>
    <sidebar></sidebar>
    <toolbar></toolbar>

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
