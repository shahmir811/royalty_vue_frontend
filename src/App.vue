<template>
	<div :class="{ bgImage: guestPage }">
		<Navbar />
		<Alert v-if="message" />
		<b-container fluid>
			<template v-if="isAuthenticated">
				<b-row class="text-center">
					<b-col cols="2" class="left-sidemenu-column">
						<SideMenu />
					</b-col>
					<b-col cols="10">
						<router-view></router-view>
					</b-col>
				</b-row>
			</template>
			<template v-else>
				<router-view></router-view>
			</template>
		</b-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Navbar from './components/Navbar/Navbar.vue';
import Alert from './components/Alert/Alert';
import SideMenu from './components/SideMenu/SideMenu';

export default {
	name: 'App',
	computed: {
		...mapGetters({
			message: 'message',
			isAuthenticated: 'auth/isAuthenticated',
		}),
		guestPage() {
			const condition =
				this.$route.path === '/' ||
				this.$route.path === '/login' ||
				this.$route.path === '/forgot-password' ||
				this.$route.path === '/password-reset';
			return condition ? true : false;
		},
	},
	mounted() {
		if (this.isAuthenticated) {
			this.fetchTaxDetails();
		}
	},
	components: {
		Alert,
		Navbar,
		SideMenu,
	}, // components end here
	data() {
		return {
			path: null,
		};
	},
	methods: {
		...mapActions({
			fetchTaxDetails: 'tax/fetchTaxDetails',
		}),
	},
};
</script>

<style lang="scss">
@import './styles/styles.scss';

.bgImage {
	background-image: url('~@/assets/bg-dubai.jpg');
	height: 100vh;
}
</style>
