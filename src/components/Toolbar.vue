<template>
   <v-toolbar class="red">
      <v-toolbar-title>
        <v-toolbar-side-icon @click.native.stop="data.drawer = !data.drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
      <v-text-field
        label="Search..."
        single-line
        append-icon="search"
        v-model="data.search"
        @keyup.native="searching"
        dark
        hide-details
      ></v-text-field>
      
    </v-toolbar>
</template>

<script>
import {Store} from '@/Store.js'
import _ from 'lodash'

export default {
  name: 'toolbar',
  data() {
    return {
      data: Store.data
    }
  },
  methods: {
    searching: _.debounce(() => {
      Store.search();
    }, 1000)

  }
}
</script>
