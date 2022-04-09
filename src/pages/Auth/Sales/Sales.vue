<template>
	<div>
		<h1 class="page-title">Sales Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-sale">
					<b-button class="admin-users-component-add-new-purchase-button"
						><i class="fa fa-plus" aria-hidden="true"></i> New Sale
					</b-button>
				</router-link>
				<router-link
					v-if="selectedSale"
					:to="{
						name: 'sale-details',
						params: { id: selectedSale.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-bars" aria-hidden="true"></i> Details</b-button
					>
				</router-link>
				<b-button
					v-if="selectedSale"
					class="admin-users-component-add-new-inventory-button w-195 ml-2"
					@click.prevent="printSaleDetails(selectedSale.id)"
					><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Print</b-button
				>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="sales"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectSale"
					:showBorders="true"
					:show-row-lines="true"
					:word-wrap-enabled="true"
					@cell-prepared="onCellPrepared"
				>
					<DxColumn data-field="sale_invoice_no" caption="Invoice No" :fixed="true" />
					<DxColumn data-field="quotation" caption="Sale Quotation" alignment="left" />
					<DxColumn data-field="type" caption="Type" alignment="left" />
					<DxColumn data-field="tax_percent" caption="Tax (%)" alignment="left" />
					<DxColumn data-field="customer_name" caption="Customer Name" alignment="left" />
					<DxColumn data-field="contact_no" caption="Contact Number" alignment="left" />
					<DxColumn data-field="created_by" caption="Created By" alignment="left" />
					<DxColumn data-field="created_at" caption="Date" alignment="left" />
					<DxColumn data-field="status" caption="Status" alignment="left" />
					<DxColumn v-if="role === 'admin'" data-field="total_sale_price" caption="Total Sale" alignment="left" />
					<DxColumn v-if="role === 'admin'" data-field="margin" caption="Profit (%)" alignment="left" />
					<DxColumn v-if="role === 'admin'" data-field="profit_amount" caption="Profit (AED)" alignment="left" />

					<DxSelection mode="single" />
					<DxFilterRow :visible="true" />
					<DxSearchPanel :visible="true" />
					<DxPaging :enabled="true" :page-size="25" />
					<DxPager :show-navigation-buttons="true" :show-info="true" info-text="Page #{0}. Total: {1} ({2} items)" />
				</DxDataGrid>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Spinner from '../../../components/Spinner/Spinner.vue';
import {
	DxDataGrid,
	DxColumn,
	DxFilterRow,
	DxSearchPanel,
	DxSelection,
	DxPaging,
	DxPager,
} from 'devextreme-vue/data-grid';

export default {
	name: 'SalesPage',
	mounted() {
		this.fetchSalesList();
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
	data() {
		return {
			selectedSale: undefined,
		};
	},
	computed: {
		...mapGetters({
			sales: 'sales/sales',
			pageLoad: 'sales/pageLoad',
			errors: 'sales/errors',
			role: 'auth/role',
		}),
	},
	methods: {
		...mapActions({
			fetchSalesList: 'sales/fetchSalesList',
			printSaleDetailsOnServer: 'sales/printSaleDetailsOnServer',
		}),
		printSaleDetails(id) {
			console.log('ID: ' + id);
			this.printSaleDetailsOnServer(id);
		},
		selectSale(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(sale => {
				if (sale) {
					this.selectedSale = sale;
				}
			});
		},
		onCellPrepared(e) {
			if (e.rowType == 'data' && e.column.dataField == 'margin') {
				if (e.data.margin > 0) {
					e.cellElement.className += ' greenText';
				} else {
					e.cellElement.className += ' redText';
				}
			}
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
