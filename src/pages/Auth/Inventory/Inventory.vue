<template>
	<div>
		<h1 class="page-title">Inventory Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-inventory">
					<b-button class="admin-users-component-add-new-inventory-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add Item</b-button
					>
				</router-link>
			</b-row>

			<b-row class="pr-20">
				<table class="table table-hover">
					<thead class="table-header-class">
						<tr>
							<th>#</th>
							<th>Item Name</th>
							<th>Price (AED)</th>
							<th>Quantity</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(invty, index) in inventories" :key="invty.id">
							<td scope="row">{{ ++index }}</td>
							<td>{{ invty.item_name }}</td>
							<td>{{ invty.sale_price }}</td>
							<td>{{ invty.quantity }}</td>
							<td>
								<router-link
									class="update-user-link mr-2"
									:to="{
										name: 'update-inventory',
										params: { id: invty.id },
									}"
								>
									<i class="fa fa-pencil" aria-hidden="true"></i>
								</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'InventoryPage',
	mounted() {
		this.fetchInventory();
	},
	components: {
		Spinner,
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			inventories: 'invt/inventories',
			pageLoad: 'invt/pageLoad',
			errors: 'invt/errors',
		}),
	},
	methods: {
		...mapActions({
			fetchInventory: 'invt/fetchInventory',
		}),
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.admin-users-component-add-new-inventory-button {
	width: 160px;
	height: 45px;
	background: $BROWN-10 !important;
	margin-bottom: 15px;

	a {
		@extend .regular-16px-24px;
		color: $GREY-1 !important;

		&:hover {
			outline: none;
			border: none;
		}

		&:hover {
			@extend .regular-16px-24px;
			background: $BROWN-11 !important;
		}
	}
}
</style>
