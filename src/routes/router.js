import Vue from 'vue';
import Router from 'vue-router';
import beforeEach from './beforeEach';

Vue.use(Router);

import Landing from '../pages/Landing/Landing.vue';
import Login from '../pages/Login/Login.vue';
import NotFound from '../pages/Error/NotFound.vue';
import Home from '../pages/Auth/Home/Home.vue';
import Users from '../pages/Auth/Users/Users.vue';
import AddUser from '../pages/Auth/Users/AddUser.vue';
import UpdateUser from '../pages/Auth/Users/UpdateUser.vue';
import Tax from '../pages/Auth/Tax/Tax.vue';
import Inventory from '../pages/Auth/Inventory/Inventory.vue';
import Sales from '../pages/Auth/Sales/Sales.vue';
import Purchase from '../pages/Auth/Purchase/Purchase.vue';
import SalesQuotation from '../pages/Auth/SalesQuotation/SalesQuotation.vue';
import Customers from '../pages/Auth/Customers/Customers.vue';
import CustomerCredit from '../pages/Auth/CustomerCredit/CustomerCredit.vue';
import Locations from '../pages/Auth/Locations/Locations.vue';
import AddLocation from '../pages/Auth/Locations/AddLocation.vue';
import UpdateLocation from '../pages/Auth/Locations/UpdateLocation.vue';

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
			path: '/home',
			component: Home,
			name: 'home',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/users',
			component: Users,
			name: 'users',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/add-user',
			component: AddUser,
			name: 'add-user',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/update-user/:id',
			component: UpdateUser,
			name: 'update-user',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/customers',
			component: Customers,
			name: 'customers',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/customer-credit',
			component: CustomerCredit,
			name: 'customer-credit',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/tax',
			component: Tax,
			name: 'tax',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/inventory',
			component: Inventory,
			name: 'inventory',
			meta: { guest: false, needsAuth: true },
		},

		{
			path: '/sales',
			component: Sales,
			name: 'sales',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/sales-quotation',
			component: SalesQuotation,
			name: 'sales-quotation',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/locations',
			component: Locations,
			name: 'locations',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/add-location',
			component: AddLocation,
			name: 'add-location',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/update-location/:id',
			component: UpdateLocation,
			name: 'update-location',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '/purchase',
			component: Purchase,
			name: 'purchase',
			meta: { guest: false, needsAuth: true },
		},
		{
			path: '*',
			component: NotFound,
		},
	],
});

// Registering beforeEach
router.beforeEach(beforeEach);

export default router;
