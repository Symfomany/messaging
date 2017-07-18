<template>
    <v-layout row wrap>
      <v-flex xs10 sm6 offset-sm3>
        <v-card>
          <list></list>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import {Store} from '@/Store.js'
import List from '@/components/List'

export default {
  name: 'main',
  components: {list: List},
  data(){
    return {
    }
  },
  created(){
  },
  
}
</script>

<style>
.layout{
 
}

</style>