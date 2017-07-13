<template>
       <v-layout id="main">
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
            <v-list dark two-line>
            
              <v-progress-linear v-if="videos.length == 0" :indeterminate="true"></v-progress-linear>

                <template  v-for="item in videos">
                  <v-divider v-if="item.divider" :inset="item.inset"></v-divider>

                  <v-list-tile avatar  :key="item.id.videoId">
                    <v-list-tile-avatar>
                      <img :src="item.snippet.thumbnails.default.url"></v-list-tile-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.snippet.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.snippet.description"></v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn icon ripple @click.native="go(item.id.videoId)">
                        <v-icon dark>keyboard_arrow_right</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider></v-divider>

                </template>

              </v-list>
              </v-card>
                <v-btn @click.native="more" block secondary dark>Voir plus</v-btn>
          </v-flex>
        </v-layout>
</template>

<script>

import {Store} from '@/Store.js'


export default {
  name: 'main',
  data(){
    return {
       videos: [],
    }
  },
  created(){
    Store.load().then((res) => {
      this.videos = res.data.items
    });
  },
  methods: {
    go(id){
      this.$router.push(`/detail/${id}`)
    },
    more(){
      Store.more().then((res) => {
        this.videos = res.data.items;
      })
    }
    
  }
}
</script>

<style>
.layout{
 
}

</style>