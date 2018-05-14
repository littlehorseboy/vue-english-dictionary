import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/Index';
import EnglishDictionary from '@/pages/EnglishDictionary';

import SelectEnglish from '@/components/SelectEnglish';
import InsertEnglish from '@/components/InsertEnglish';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/englishdictionary',
      name: 'EnglishDictionary',
      component: EnglishDictionary,
      children: [
        {
          path: 'selectEnglish',
          name: 'SelectEnglish',
          component: SelectEnglish,
        },
        {
          path: 'insertenglish',
          name: 'InsertEnglish',
          component: InsertEnglish,
        },
      ],
    },

  ],
});
