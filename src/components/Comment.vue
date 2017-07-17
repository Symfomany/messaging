<template>
  <v-layout row wrap>
      <v-flex xs10 sm6 offset-sm3>
        <v-list two-line v-if="comments.length">
          <v-list-tile v-for="comment in comments" :key="comment.id">
            <v-list-tile-content>
              <v-list-tile-title>{{ comment.content }}</v-list-tile-title>
            </v-list-tile-content>
             <v-list-tile-action>
              <v-btn @click.native="remove(comment.id)" icon ripple>
                <v-icon class="grey--text text--lighten-1">delete_forever</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-alert v-else error value="true">
          Aucun commentaire pour le moment
        </v-alert>

        <form @submit.prevent="addComment">
         <v-text-field
            name="input-1-3"
            label="Réagissez"
            single-line
            prepend-icon="comment"
            v-model="newComm"
          ></v-text-field>
          </form>

      </v-flex>
    </v-layout>

</template>

<script>
import {Store} from '@/Store'
import _ from 'lodash'

export default {
  name: 'comments',
  data() {
    return {
      comments: [],
      newComm: ''
    }
  },
   created() {
    Store.getComments(this.$route.params.id).then((res) => {
      this.comments = res.data
    });
  },
  methods: {
    addComment(){
      Store.addComment(this.$route.params.id, this.newComm).then((res) => {
        this.newComm = '';
        this.comments.push(res.data)
      });
    },
    remove(id){
      Store.removeComment(id).then((res) => {
       this.comments =  _.reject(this.comments, function(item){
            return item.id === id;
        });
      });
    }
  }
}
</script>
