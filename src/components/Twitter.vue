<template>
  <div>
    <v-list dark three-line>
        <v-list-tile v-for="tweet in tweets"  avatar  :key="tweet.id">
          <v-list-tile-avatar>
            <img v-bind:src="tweet.user.profile_image_url"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="tweet.text"></v-list-tile-title>
            <v-chip><v-icon class="fa fa-retweet"></v-icon> {{ tweet.retweet_count }}</v-chip>
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
    <v-btn block secondary dark>Voir plus</v-btn>
  </div>
</template>
<script>

import {Store} from '@/Store.js'
import Item from '@/components/Item'


export default {
  name: 'main',
  data(){
    return {
      tweets: []
    }
  },
  components: {item: Item},
  created(){
      Store.loadTweets().then((res) => {
        this.tweets = res.data;
      });
  },
  methods: {
    
  }
}
</script>

<style>
.layout{
 
}
.list-enter-active {
  transition: all 0.5s;
}
.list-enter{
  opacity: 0;
  transform: translateY(30px);
}
</style>