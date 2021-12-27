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
				<router-link
					v-if="selectedInventory"
					:to="{
						name: 'update-inventory',
						params: { id: selectedInventory.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button ml-2"
						><i class="fa fa-pencil" aria-hidden="true"></i> Update
						Item</b-button
					>
				</router-link>
			</b-row>

			<b-row class="pr-20">
				<DxDataGrid
					:data-source="inventories"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectInventory"
					:showBorders="true"
					:show-row-lines="true"
					:word-wrap-enabled="true"
					@row-prepared="onRowPrepared"
				>
					<DxColumn data-field="item_name" :fixed="true" sort-order="asc" />
					<DxColumn data-field="location" alignment="left" />
					<DxColumn data-field="quantity" alignment="center" />
					<DxColumn
						data-field="avg_price"
						alignment="center"
						caption="Avg. Price"
					/>
					<DxColumn data-field="purchase_price" alignment="center" />
					<DxColumn data-field="sale_price" alignment="center" />

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
	name: 'InventoryPage',
	mounted() {
		this.fetchInventory();
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
			inventories: 'invt/inventories',
			pageLoad: 'invt/pageLoad',
			errors: 'invt/errors',
		}),
	},
	data() {
		return {
			selectedInventory: undefined,
		};
	},
	methods: {
		...mapActions({
			fetchInventory: 'invt/fetchInventory',
		}),
		selectInventory(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(inventory => {
				if (inventory) {
					this.selectedInventory = inventory;
				}
			});
		},
		onRowPrepared(e) {
			if (e.rowType === 'data') {
				const { quantity } = e.data;

				if (quantity > 0 && quantity < 15)
					e.rowElement.classList.add('lowInventory');
				else if (quantity === 0) e.rowElement.classList.add('noInventory');
			}
		},
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
