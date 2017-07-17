// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource';
import 'vuetify/dist/vuetify.min.css'
import VueSocketio from 'vue-socket.io';
import FBSignInButton from 'vue-facebook-signin-button'
Vue.config.productionTip = false

/**
 * Vue Resource
 */
Vue.use(VueResource);

/**
 * Plugins
 */
Vue.use(Vuetify)

/**
 * Socket.IO 
 */
Vue.use(VueSocketio, 'http://localhost:4050');

/**
 * Fb Signin
 */
Vue.use(FBSignInButton)


window.fbAsyncInit = function () {
  FB.init({
    appId: '446979352009018',
    cookie: true,  // enable cookies to allow the server to access the session
    xfbml: true,  // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  });
};
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
