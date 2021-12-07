<template>
	<div class="navbar-wrapping-div">
		<b-navbar
			toggleable="lg"
			type="dark"
			variant="info"
			class="navbar-wrapper-class"
		>
			<b-navbar-brand href="#">
				<router-link to="/" class="site-title" v-if="!isAuthenticated">
					<h4>Royalty</h4>
				</router-link>
				<router-link to="/home" class="site-title" v-else>
					<h4><i class="fa fa-home" aria-hidden="true"></i> Royalty</h4>
				</router-link>
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right v-if="isAuthenticated">
						<!-- Using 'button-content' slot -->
						<template #button-content>
							<em
								><i class="fa fa-user" aria-hidden="true"></i> Welcome,
								{{ user.name }}</em
							>
						</template>
						<b-dropdown-item href="#">Profile</b-dropdown-item>
						<b-dropdown-item href="#" @click.prevent="exitApplication"
							>Sign Out</b-dropdown-item
						>
					</b-nav-item-dropdown>

					<b-nav-item href="#" v-if="!isAuthenticated">
						<router-link to="/login" class="navbar-link"
							><i class="fa fa-sign-in" aria-hidden="true"></i>
							Login</router-link
						>
					</b-nav-item>

					<b-nav-item href="#" @click.prevent="exitApplication" v-else
						><i class="fa fa-sign-out" aria-hidden="true"></i>
						Logout</b-nav-item
					>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Navbar',
	computed: {
		...mapGetters({
			isAuthenticated: 'auth/isAuthenticated',
			user: 'auth/user',
		}),
	},
	methods: {
		...mapActions({
			logout: 'auth/logout',
			clearAuthState: 'auth/clearAuthState',
			clearUserState: 'user/clearUserState',
		}),
		exitApplication() {
			this.logout().then(() => {
				this.clearAuthState();
				this.clearUserState();
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';

.navbar-wrapper-class {
	background-color: $NAVBAV_BASE_COLOR !important;
}

.site-title {
	color: $NAVLINKS !important;
	text-decoration: none;

	&:hover {
		color: $NAVLINKS_HOVER !important;
		text-decoration: none;
	}
}
.navbar-link {
	color: $NAVLINKS !important;
	text-decoration: none;

	&:hover {
		color: $NAVLINKS_HOVER !important;
		text-decoration: none;
	}
}

.profile-link {
	color: black !important;

	&:hover {
		text-decoration: none;
	}
}
</style>
