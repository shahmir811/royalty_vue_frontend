<template>
	<div class="navbar-wrapping-div">
		<b-navbar
			toggleable="lg"
			type="dark"
			variant="info"
			class="navbar-wrapper-class"
		>
			<b-navbar-brand href="#">
				<router-link to="/" class="site-title">
					<h4>Royalty</h4>
				</router-link>
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="#">
						<router-link to="/login" class="navbar-link">Login</router-link>
					</b-nav-item>
					<b-nav-item href="#" disabled>Disabled</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown text="Lang" right>
						<b-dropdown-item href="#">EN</b-dropdown-item>
						<b-dropdown-item href="#">ES</b-dropdown-item>
						<b-dropdown-item href="#">RU</b-dropdown-item>
						<b-dropdown-item href="#">FA</b-dropdown-item>
					</b-nav-item-dropdown>

					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template #button-content>
							<em>User</em>
						</template>
						<b-dropdown-item href="#">Profile</b-dropdown-item>
						<b-dropdown-item href="#">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
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
