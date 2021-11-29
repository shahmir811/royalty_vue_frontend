import Vue from 'vue';
import Router from 'vue-router';
// import beforeEach from './beforeEach';

Vue.use(Router);

import Landing from '../pages/Landing/Landing.vue';
import Login from '../pages/Login/Login.vue';
import NotFound from '../pages/Error/NotFound.vue';

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Landing,
			name: 'landing',
			meta: { guest: true, needsAuth: false },
		},
		{
			path: '/login',
			component: Login,
			name: 'login',
			meta: { guest: true, needsAuth: false },
		},
		{
			path: '*',
			component: NotFound,
		},
	],
});

// Registering beforeEach
// router.beforeEach(beforeEach);

export default router;
