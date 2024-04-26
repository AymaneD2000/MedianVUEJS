// src/router/index.js
import { createMemoryHistory, createRouter } from 'vue-router'
import ArticleList from '../components/Articles-pages.vue';
import AddArticle from '../components/AddArticle.vue';

const routes = [
  {
    path: '/',
    name: 'ArticleList',
    component: ArticleList,
  },
  {
    path: '/addarticle',
    name: 'AddArticle',
    component: AddArticle,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
