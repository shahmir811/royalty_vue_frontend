<template>
	<div>
		<h1 class="page-title">Purchase Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-purchase">
					<b-button class="admin-users-component-add-new-purchase-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add
						Purchase</b-button
					>
				</router-link>
				<router-link
					v-if="selectedPurchase"
					:to="{
						name: 'purchase-details',
						params: { id: selectedPurchase.id },
					}"
				>
					<b-button
						class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-bars" aria-hidden="true"></i> Details</b-button
					>
				</router-link>

				<b-button
					v-if="selectedPurchase && selectedPurchase.status === 'Pending'"
					href="#"
					class="admin-users-component-change-status-button ml-2"
					@click.prevent="onChangeStatusHandler(selectedPurchase.id)"
				>
					<i class="fa fa-handshake-o" aria-hidden="true"></i> Change Status
				</b-button>

				<b-button
					v-if="
						selectedPurchase &&
						selectedPurchase.status === 'Pending' &&
						role === 'admin'
					"
					href="#"
					class="admin-users-component-change-status-button ml-2"
					@click.prevent="onDeletePurchaseHandler(selectedPurchase.id)"
				>
					<i class="fa fa-times" aria-hidden="true"></i> Remove
				</b-button>
				<b-button
					v-if="selectedPurchase"
					class="admin-users-component-change-status-button w-195 ml-2"
					@click.prevent="printPurchaseDetails(selectedPurchase.id)"
					><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Print</b-button
				>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="purchases"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectPurchase"
					:showBorders="true"
					:show-row-lines="true"
					@cell-prepared="onCellPrepared"
				>
					<DxColumn
						data-field="purchase_invoice_no"
						caption="Invoice No"
						:fixed="true"
					/>
					<DxColumn data-field="local_purchase" alignment="center" />
					<DxColumn data-field="total_amount" alignment="center" />
					<DxColumn
						data-field="user"
						caption="Purchased By"
						alignment="center"
					/>
					<DxColumn
						data-field="created_at"
						caption="Purchase Date"
						alignment="center"
					/>
					<DxColumn data-field="status" caption="Status" alignment="center" />

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
	name: 'PurchasePage',
	mounted() {
		this.fetchPurchases();
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
			purchases: 'purchase/purchases',
			pageLoad: 'purchase/pageLoad',
			errors: 'purchase/errors',
		}),
	},
	data() {
		return {
			selectedPurchase: undefined,
		};
	},
	methods: {
		...mapActions({
			fetchPurchases: 'purchase/fetchPurchases',
			remove: 'purchase/removePurchaseOrder',
			changeStatus: 'purchase/changePurchaseStatusOnServer',
			printPurchaseDetailsOnServer: 'purchase/printPurchaseDetailsOnServer',
		}),
		selectPurchase(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(purchase => {
				if (purchase) {
					this.selectedPurchase = purchase;
				}
			});
		},
		onCellPrepared(e) {
			if (e.rowType == 'data' && e.column.dataField == 'local_purchase') {
				if (e.data.local_purchase === 'No') {
					e.cellElement.className += ' deactive';
				}
			}

			if (e.rowType == 'data' && e.column.dataField == 'status') {
				if (e.data.status === 'Pending') {
					e.cellElement.className += ' pending';
				}
			}
		},
		onChangeStatusHandler(id) {
			this.$swal
				.fire({
					title: 'Are you sure to change this purchase order status?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, change it!',
				})
				.then(result => {
					if (result.value) {
						this.changeStatus(id).then(() => {
							this.$swal.fire(
								'Done!',
								'Purchase order has been received.',
								'success'
							);
						});
					}
				});
		},
		printPurchaseDetails(id) {
			console.log('ID: ' + id);
			this.printPurchaseDetailsOnServer(id);
		},
		onDeletePurchaseHandler(id) {
			this.$swal
				.fire({
					title: 'Are you sure to remove this purchase order?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						this.remove(id).then(() => {
							this.$swal.fire(
								'Done!',
								'Purchase order has been removed.',
								'success'
							);
						});
					}
				});
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.admin-users-component-add-new-purchase-button {
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
