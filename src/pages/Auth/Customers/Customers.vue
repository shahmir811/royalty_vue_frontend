<template>
	<div>
		<h1 class="page-title">Customers Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-customer">
					<b-button class="admin-users-component-add-new-customer-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add
						Customer</b-button
					>
				</router-link>
				<router-link
					v-if="selectedCustomer"
					:to="{
						name: 'show-customer',
						params: { id: selectedCustomer.id },
					}"
				>
					<b-button
						class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-bars" aria-hidden="true"></i> Details</b-button
					>
				</router-link>
				<router-link
					v-if="selectedCustomer"
					:to="{
						name: 'update-customer',
						params: { id: selectedCustomer.id },
					}"
				>
					<b-button
						class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-pencil" aria-hidden="true"></i> Update
						Customer</b-button
					>
				</router-link>
				<b-button
					v-if="role === 'admin' && selectedCustomer"
					href="#"
					class="admin-users-component-change-status-button ml-2"
					@click.prevent="onDeleteHandler(selectedCustomer.id)"
				>
					<i class="fa fa-handshake-o" aria-hidden="true"></i> Change Status
				</b-button>
			</b-row>

			<b-row class="pr-20">
				<DxDataGrid
					:data-source="customers"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectCustomer"
					:showBorders="true"
					:show-row-lines="true"
					@cell-prepared="onCellPrepared"
				>
					<DxColumn data-field="name" :fixed="true" sort-order="asc" />
					<DxColumn data-field="country" alignment="center" />
					<DxColumn data-field="mobile_no_dubai" caption="Dubai Contact" />
					<DxColumn data-field="mobile_no_country" caption="Country Contact" />
					<DxColumn data-field="credit_amount" alignment="center" />
					<DxColumn data-field="status" alignment="center" />

					<DxSelection mode="single" />
					<DxFilterRow :visible="true" />
					<DxSearchPanel :visible="true" />
					<DxPaging :enabled="true" :page-size="25" />
					<DxPager
						:show-navigation-buttons="true"
						:show-info="true"
						info-text="Page #{0}. Total: {1} ({2} items)"
					/>
				</DxDataGrid>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
	DxDataGrid,
	DxColumn,
	DxFilterRow,
	DxSearchPanel,
	DxSelection,
	DxPaging,
	DxPager,
} from 'devextreme-vue/data-grid';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'CustomersPage',
	mounted() {
		this.fetchCustomers();
	},
	components: {
		Spinner,
		DxDataGrid,
		DxColumn,
		DxFilterRow,
		DxSearchPanel,
		DxSelection,
		DxPaging,
		DxPager,
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			customers: 'customer/customers',
			pageLoad: 'customer/pageLoad',
			errors: 'customer/errors',
		}),
	},
	data() {
		return {
			selectedCustomer: undefined,
		};
	},
	methods: {
		...mapActions({
			fetchCustomers: 'customer/fetchCustomers',
			changeCustomerStatus: 'customer/changeCustomerStatus',
		}),
		onDeleteHandler(customerId) {
			this.$swal
				.fire({
					title: 'Are you sure to change this customer status?',
					// text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, change it!',
				})
				.then(result => {
					if (result.value) {
						this.changeCustomerStatus(customerId).then(() => {
							this.$swal.fire(
								'Done!',
								'Customer status has been changed.',
								'success'
							);
						});
					}
				});
		},
		selectCustomer(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(customer => {
				if (customer) {
					this.selectedCustomer = customer;
				}
			});
		},
		onCellPrepared(e) {
			if (e.rowType == 'data' && e.column.dataField == 'status') {
				if (e.data.status === 'Deactive') {
					e.cellElement.className += ' deactive';
				}
			}
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.admin-users-component-add-new-customer-button {
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

.admin-users-component-change-status-button {
	width: 170px;
	height: 45px;
	padding-top: 9px !important;
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
