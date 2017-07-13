<template>
  <div class="detail">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
               <v-btn primary dark @click.native="back"><v-icon>arrow_back</v-icon> Revenir à la liste</v-btn>
               <h5>{{ video.snippet.title }}</h5>
               <p v-html="video.snippet.description|linkify"></p>
               <v-chip :key="tag.id" v-for="tag in video.snippet.tags" class="secondary white--text">{{ tag }}</v-chip>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import {Store} from '@/Store.js'


export default {
  name: 'detail',
  data(){
    return {
      video: {
        snippet: {
          title: ''
        }
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
    back(){
      this.$router.push('/')
    }
  },
  created() {
    Store.one(this.$route.params.id).then((res) => {
      console.log(res.data.items[0])
      this.video = res.data.items[0]
    });
  }
}
</script>
