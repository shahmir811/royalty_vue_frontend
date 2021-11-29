<template>
	<div class="sidemenu-component-wrapping-div">
		<template v-if="role === 'admin'">
			<router-link to="/home" class="side-menu-links">Home</router-link>
			<router-link to="/tax" class="side-menu-links">Tax</router-link>
			<router-link to="/users" class="side-menu-links"
				>Users Management</router-link
			>
			<router-link to="/customers" class="side-menu-links"
				>Customers Management</router-link
			>
			<router-link to="/customer-credit" class="side-menu-links"
				>Customer Credit Management</router-link
			>
			<router-link to="/locations" class="side-menu-links"
				>Locations Management</router-link
			>
			<router-link to="/inventory" class="side-menu-links"
				>Inventory Management</router-link
			>
			<router-link to="/purchase" class="side-menu-links"
				>Purchase Management</router-link
			>
			<router-link to="/sales" class="side-menu-links"
				>Sales Management</router-link
			>
			<router-link to="/sales-quotation" class="side-menu-links"
				>Sales Quotations</router-link
			>
		</template>
		<template v-else>
			<router-link to="/home" class="side-menu-links">Home</router-link>
			<router-link to="/orders" class="side-menu-links"
				>Customers Management</router-link
			>
			<router-link to="/completed-orders" class="side-menu-links"
				>Customer Credit Management</router-link
			>
			<router-link to="/inventory" class="side-menu-links"
				>Inventory Management</router-link
			>
			<router-link to="/scanbarcode" class="side-menu-links"
				>Scan BarCode</router-link
			>
			<router-link to="/import-file" class="side-menu-links"
				>Import Excel File</router-link
			>
		</template>
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
