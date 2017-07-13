<template>
  <div class="favorites">
       <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card dark>

              <v-list  dark >
            
              <v-progress-linear v-if="videos.length == 0" :indeterminate="true"></v-progress-linear>

                <template v-else v-for="item in videos">
                  <v-list-tile   :key="item.id.videoId">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.snippet.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon dark>keyboard_arrow_right</v-icon>
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
 created(){
    this.$http.get('http://localhost:3000/').then((res) => {
      this.videos = res.body.items;
    })
  },
  methods: {
  }
}
</script>
