<template>
	<DxDataGrid
		:data-source="dataSource"
		key-expr="id"
		:allow-column-reordering="true"
		:showBorders="true"
		:show-row-lines="true"
	>
		<DxColumn
			v-for="(column, index) in columnsData"
			:key="index"
			:data-field="column.name"
			:fixed="column.fixed"
			:caption="column.caption"
			:alignment="column.alignment"
			@selection-changed="rowClicked"
		/>

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
</template>

<script>
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
	name: 'DataGridComponent',
	props: {
		dataSource: Array,
		columnsData: Array,
		chooseRow: Function,
	},
	// props: ['dataSource', 'columnsData'],
	data() {
		return {
			// col: this.columns,
		};
	},
	components: {
		DxDataGrid,
		DxColumn,
		DxFilterRow,
		DxSearchPanel,
		DxSelection,
		DxPaging,
		DxPager,
	},
	methods: {
		// customizeColumns(columns) {
		// 	columns[0].width = 100;
		// 	columns[1].width = 210;
		// },
		rowClicked(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(record => {
				if (record) {
					this.$emit('chooseRow', record);
				}
			});
		},
	},
};
</script>

<style lang="scss">
// @import '../../../styles/styles.scss';
</style>
