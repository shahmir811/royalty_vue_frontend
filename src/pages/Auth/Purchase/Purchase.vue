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
			</b-row>

			<b-row class="pr-20">
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
