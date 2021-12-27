<template>
	<div class="sidemenu-component-wrapping-div">
		<router-link to="/home" class="side-menu-links"
			><i class="fa fa-home mr-2" aria-hidden="true"></i> Home</router-link
		>
		<router-link to="/tax" class="side-menu-links" v-if="role === 'admin'"
			><i class="fa fa-money mr-2" aria-hidden="true"></i> Tax</router-link
		>
		<router-link to="/users" class="side-menu-links" v-if="role === 'admin'"
			><i class="fa fa-users mr-2" aria-hidden="true"></i> Users
			Management</router-link
		>
		<router-link to="/customers" class="side-menu-links"
			><i class="fa fa-cogs mr-2" aria-hidden="true"></i> Customers
			Management</router-link
		>
		<router-link to="/customer-credit" class="side-menu-links"
			>Customer Credit Management</router-link
		>
		<router-link to="/locations" class="side-menu-links"
			><i class="fa fa-location-arrow mr-2" aria-hidden="true"></i> Locations
			Management</router-link
		>
		<router-link to="/items" class="side-menu-links"
			><i class="fa fa-tasks mr-2" aria-hidden="true"></i> Items
			Management</router-link
		>
		<router-link to="/inventory" class="side-menu-links"
			><i class="fa fa-file-text-o mr-2" aria-hidden="true"></i> Inventory
			Management</router-link
		>
		<router-link to="/purchase" class="side-menu-links"
			><i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i> Purchase
			Management</router-link
		>
		<router-link to="/sales" class="side-menu-links"
			><i class="fa fa-credit-card mr-2" aria-hidden="true"></i> Sales
			Management</router-link
		>
		<router-link to="/sales-quotation" class="side-menu-links"
			><i class="fa fa-address-card mr-2" aria-hidden="true"></i> Sales
			Quotations</router-link
		>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'SideMenu',
	computed: {
		...mapGetters({
			role: 'auth/role',
		}),
	},
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';

.sidemenu-component-wrapping-div {
	border: 1px solid $SIDEMENU_BORDER_COLOR;
	height: 500px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	// align-items: flex-start;
	// padding-left: 25px;
}

.side-menu-links {
	height: 47px;
	// border: 1px solid $SIDEMENU_BORDER_COLOR;
	color: $SIDEMENU_LINKS_COLOR !important;
	display: flex;
	align-items: center;
	padding-left: 25px;

	&:hover {
		color: $SIDEMENU_LINKS_HOVER_COLOR !important;
		background-color: $SIDEMENU_LINKS_HOVER;
	}
}
</style>
