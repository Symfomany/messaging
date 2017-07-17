<template>
  <div>
    <v-list dark two-line>
      <transition-group name="list">
          <div  v-for="item in datas.videos" :key="item.id.videoId">
            <item :key="item.id.videoId" :item="item"></item>
          </div>
      </transition-group>
    </v-list>
    <v-btn @click.native="more" block secondary dark>Voir plus</v-btn>
  </div>
</template>
<script>

import {Store} from '@/Store.js'
import Item from '@/components/Item'


export default {
  name: 'main',
  data(){
    return {
      datas: Store.data
    }
  },
  components: {item: Item},
  created(){
      Store.load()
  },
  computed: {
    search(){
      return Store.search();
    }
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
.list-enter-active {
  transition: all 0.5s;
}
.list-enter{
  opacity: 0;
  transform: translateY(30px);
}
</style>