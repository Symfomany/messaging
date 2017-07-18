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

       <v-subheader v-if="data.isAuth == true" class="mt-3 grey--text text--darken-1">Profil</v-subheader>

        <v-list v-if="data.isAuth == true">

          <v-list-tile avatar >
            <v-list-tile-avatar>
              <img :src="`//graph.facebook.com/${data.me.id}/picture`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title>Bonjour <b>{{ data.me.name }}</b> ! <br />
            <small>{{ data.me.location.name }}</small>
            </v-list-tile-title>
          </v-list-tile>

        </v-list>
       <v-subheader class="mt-3 grey--text text--darken-1">Actions</v-subheader>
     
       <v-list>
      
       <v-list-tile :to="'/'">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Home
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

         <v-list-tile  v-if="data.isAuth == false">
              <fb-signin-button
                  :params="fbSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">
                  Se connecter avec Julien Boyer
              </fb-signin-button>
          </v-list-tile>

 
       <v-list-tile @click.native="logout" v-if="data.isAuth == true" :to="'/'">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Deconnexion
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
      fbSignInParams: {
        scope: 'public_profile,user_birthday,user_location,email,user_likes',
        return_scopes: true
      }
    }
  },
  created(){
 
  },
  methods: {
    logout(){
        localStorage.setItem('fb', "");
        Store.data.isAuth = false;
        Store.data.me = {};
    },
    onSignInSuccess (response) {
      FB.api('/me', {fields: 'last_name,email,birthday,about,context,cover,gender,hometown,location,name'}, (me) => {
        localStorage.setItem('fb', JSON.stringify(me));
        Store.data.isAuth = true;
        Store.data.me = me;
        console.log(me)
      });
      
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  },
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