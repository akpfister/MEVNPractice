// main.js

import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false; //prevent production tip on Vue startup

import HomeComponent from './components/HomeComponent.vue';
import CreateComponent from './components/CreateComponent.vue';
import IndexComponent from './components/IndexComponent.vue';
import EditComponent from './components/EditComponent.vue';
import TypeComponent from './components/TypeComponent.vue';
import TypeDBComponent from './components/TypeDBComponent.vue';
import WikiComponent from './components/WikiComponent.vue';
import EditDBComponent from './components/EditDBComponent.vue';
import AllStatsComponent from './components/AllStatsComponent.vue';
import GraphComponent from './components/GraphComponent.vue';


const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
      name: 'create',
      path: '/create',
      component: CreateComponent
  },
  {
      name: 'posts',
      path: '/posts',
      component: IndexComponent
  },
  {
      name: 'edit',
      path: '/edit/:id',
      component: EditComponent
  },
  {
      name: 'type',
      path: '/type',
      component: TypeComponent
  },
  {
      name: 'typeDB',
      path: '/typeDB',
      component: TypeDBComponent
  },
  {
      name: 'wiki',
      path: '/wiki',
      component: WikiComponent
  },
  {
      name: 'editDB',
      path: '/editDB',
      component: EditDBComponent
  },
  {
      name: 'allstats',
      path: '/allstats',
      component: AllStatsComponent
  },
  {
      name: 'graph',
      path: '/graph',
      component: GraphComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');
