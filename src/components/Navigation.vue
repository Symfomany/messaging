<template>
    <v-card>
        <v-bottom-nav height="120px" absolute value="true">
          <v-btn flat  dark @click.native="naviguate('list')" :value="'list'">
            <span>Search</span>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn dark light @click.native="naviguate('favorites')" :value="'favorites'">
            <span>Favorites</span>
            <v-icon>star</v-icon>
          </v-btn>
          <v-btn dark light @click.native="naviguate('stats')" :value="'stats'">
            <span>Stats</span>
            <v-icon>trending_up</v-icon>
          </v-btn>
          <v-btn light dark @click.native="naviguate('comments')" :value="'comments'">
            <span>Comments</span>
            <v-icon>comments</v-icon>
          </v-btn>
        </v-bottom-nav>
    </v-card>
</template>

<script>
import {Store} from '@/Store'

export default {
  name: 'navigation',
  data() {
    return {
    }
  },
  methods: {
      naviguate(link = "list"){
        switch(link) {
            case "list":
                this.$router.push('/')
                break;
            case "favorites":
                this.$router.push('/favorites')
                break;
            case "stats":
                this.$router.push('/stats')
                break;
            case "comments":
                this.$router.push('/comments')
                break;
            default:
                this.$router.push('/')
        }
      }
  }
  
}
</script>


<style scoped>
.application--dark .card {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>