<template>
      <div class="detail">
          <v-layout row>
            <v-flex xs10 sm6 offset-sm3>
                  <iframe width="100%"  height="300" :src="'//www.youtube.com/embed/'+ video.id" frameborder="0" allowfullscreen></iframe>
                    <div>
                      <h3 class="headline mb-0">{{ video.snippet.title }}</h3>
                      <div id="description">{{ video.snippet.description }}</div>


                       <div class="text-xs-center" id="tags">
                          <v-chip :key="tag.id" v-for="tag in video.snippet.tags" class="secondary pink--text">#{{ tag }}</v-chip>
                        </div>

                       <div class="text-xs-center" id="statistics">
                       <v-layout row wrap>
                          <v-flex xs3>
                            <v-icon>remove_red_eye</v-icon>
                            <span>{{ video.statistics.viewCount }}</span>
                          </v-flex>
                          <v-flex xs3>
                            <v-icon>mood</v-icon>
                            <span>{{ video.statistics.likeCount }}</span>
                          </v-flex>
                          <v-flex xs3>
                            <v-icon>mood_bad</v-icon>
                            <span>{{ video.statistics.dislikeCount }}</span>
                          </v-flex> 
                          <v-flex xs3>
                            <v-icon>question_answer</v-icon>
                            <span>{{ video.statistics.commentCount }}</span>
                          </v-flex>   
                          </v-layout>                    
                         </div>


                        <div class="text-xs-center">
                              <v-btn v-if="isAlready == false" @click.native="like(video.snippet.title)" class="pink btnAction" block  large>
                              <v-icon dark>favorite</v-icon> Aimé</v-btn>
                              <v-btn v-else @click.native="dislike" class="dark btnAction" block large>
                              <v-icon dark>favorite_border</v-icon> Ne plus aimé</v-btn>
                              <v-btn @click.native="comment" class="btnAction indigo" block offset-xs2  large><v-icon dark>message</v-icon> Commentez</v-btn>
                        </div>

                       <div class="text-xs-center">
                        <v-text-field
                          name="input-1-3"
                          label="Recommandez à un ami"
                          single-line
                          prepend-icon="email"
                        ></v-text-field>
                        </div>

                    </div>
                
                 <div id="related">
                    <v-layout>
                      <v-flex v-for="video in related" xs6 sm6 :key="video.id.videoId">
                        <v-card>
                          <v-card-media :src="video.snippet.thumbnails.medium.url" height="200px">
                          </v-card-media>
                          <v-card-title primary-title>
                            <div>
                              <p @click="go(video.id.videoId)">{{ video.snippet.title }}</p>
                            </div>
                          </v-card-title>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </div>
            </v-flex>
          </v-layout>

          

           <v-snackbar
            :top="true"
            v-model="snackbar"> {{ textSnackbar }}
              <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
          <br /><br /><br />
      </div>
</template>

<script>
import {Store} from '@/Store.js'


export default {
  name: 'detail',
  data(){
    return {
      snackbar: false,
      related: [],
      textSnackbar: '',
      isAlready: false,
      video: {
        snippet: {
          title: '',
        },
        statistics: {}
      }
    }
  },

  filters: {
    linkify(inputText){
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

      return replacedText;
    }
  },
  methods: {
    load(id){
      Store.one(id).then((res) => {
        this.video = res.data.items[0];
      });

      Store.already(id).then((res) => {
        this.isAlready = !res.data;
      });

      Store.related(id).then((res) => {
        this.related = res.data.items
      });
    },
    go(id){
      this.load(id)
    },
    back(){
      this.$router.push('/')
    },
    like(title){ 
       Store.like(this.$route.params.id, title).then((res) => {
          this.snackbar = true;
          this.textSnackbar = `${title} a bien été ajouté en favoris!`
          this.isAlready = true;
        });
    },
    comment(){
      this.$router.push(`/comment/${this.$route.params.id}`)
    },
    dislike(){ 
       Store.dislike(this.$route.params.id).then((res) => {
          this.snackbar = true;
          this.textSnackbar = `La vidéo été supprimé des favoris!`
          this.isAlready = false;
        });
    }
  },
  created() {
    this.load(this.$route.params.id)
  }
}
</script>

<style>
#related{
  padding-left: 5px;
  padding-right: 5px;
}
#related p{
  font-size: 12px;
}
#tags .chip{
  font-size: 12px;
    padding: 0;
    margin: 0;
    margin-right: 7px;
}
#statistics{
    margin-top: 20px;
    margin-bottom: 20px;
}
#description{
    font-size: 12px;
    height: 146px;
    overflow: auto;
    text-align: justify;
}
.headline{
  color: white;
  font-size: 20px!important;
}
.detail {
  display: inline-block;
}
.slide-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter{
  transform: translateY(20px);
  opacity: 0;
}
.application--dark .icon{
  display: block;
  text-align: center;
}
.layout .flex.xs3{
  text-align: center;
}
.btnAction .theme--dark.icon{
    padding-right: 5px;
}
</style>
