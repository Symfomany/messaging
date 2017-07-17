<template>
  <div class="favorites">
       <v-layout row>
          <v-flex xs10 sm6 offset-sm3>
            <v-card dark>

              <v-list  dark >
            
              <v-progress-linear v-if="videos.length == 0" :indeterminate="true"></v-progress-linear>

                <template v-else v-for="item in videos">
                  <v-list-tile   :key="item.id">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                     <v-btn icon ripple @click.native="go(item.id)">
                      <v-icon dark>keyboard_arrow_right</v-icon>
                       </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider></v-divider>

                </template>

              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
  </div>
</template>

<script>
export default {
  name: 'favorites',
  data(){
    return {
      videos: [],
    }
  },
  methods: {
   go(id){
      this.$router.push(`/detail/${id}`)
    },
   
  },
 created(){
    this.$http.get('http://localhost:3000/likes').then((res) => {
      this.videos = res.body;
    })
  },
  
}
</script>
