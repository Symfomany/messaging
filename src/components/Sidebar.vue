<template>
    <v-navigation-drawer
      class="pb-0"
      persistent
      absolute
      height="100%"
      clipped
      enable-resize-watcher
      v-model="data.drawer"
    >
      <v-list>
      
       <v-list-tile :to="item.url" v-for="item in items" :key="item">
          
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
import {Store} from '@/Store.js'

export default {
  name: 'sidebar',
  data() {
    return {
      data: Store.data,
      items: [
        { icon: 'home', text: 'Home', url: '/' },
        { icon: 'subscriptions', text: 'Subscriptions', url: '/' },
        { icon: 'history', text: 'History', url: '/' },
        { icon: 'featured_play_list', text: 'Playlists', url: '/' },
        { icon: 'watch_later', text: 'Watch Later', url: '/' }
      ]
    }
  }
}
</script>

<style>

.application--dark .navigation-drawer .list, .application--dark .navigation-drawer .subheader, .application--dark .navigation-drawer a{
    font-size: 18px;
    text-decoration: none;
}
.navigation-drawer>.list .list__tile--active>:first-child .icon{
  color: white;
}
</style>