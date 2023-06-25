import { createRouter, createWebHistory } from 'vue-router'
import Bar from '@/views/bar/index.vue';
import Line from '@/views/line/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bar',
      name: 'Bar',
      component: Bar,
      meta: {
        title: '柱状图'
      }
    },
    {
      path: '/line',
      name: 'Line',
      component: Line,
      meta: {
        title: '折线图'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router
