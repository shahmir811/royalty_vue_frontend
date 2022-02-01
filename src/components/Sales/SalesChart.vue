<template>
	<div>
		<template v-if="salesData.length > 0 && !loading">
			<DxChart
				id="weeklyChart"
				:data-source="records"
				palette="Soft"
				:customize-point="customizePoint"
			>
				<DxSize :height="420" />
				<DxSeries
					argument-field="day"
					value-field="margin"
					name="Sales last week"
					type="bar"
					color="#bfb"
				/>
				<DxExport :enabled="true" />
				<DxTitle :text="title" subtitle="(in AED amount)" />
				<DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
			</DxChart>
		</template>
		<template v-else>
			<p>Loading ...</p>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import {
	DxChart,
	DxSeries,
	DxExport,
	DxTitle,
	DxSize,
	DxTooltip,
} from 'devextreme-vue/chart';
// import { weeklyData } from './dummyData';

export default {
	name: 'SalesChartComponent',
	props: ['selectedRecord'],
	mounted() {
		this.getSalesRecordFromServer(this.days).then(() => {
			this.records = this.salesData;
		});
	},
	computed: {
		...mapGetters({
			salesData: 'charts/salesData',
			title: 'charts/title',
			loading: 'charts/loading',
		}),
	},
	watch: {
		selectedRecord: function (newValue) {
			this.days = newValue;
			this.getNewSalesData();
		},
	},
	components: {
		DxSize,
		DxChart,
		DxSeries,
		DxExport,
		DxTitle,
		DxTooltip,
	},
	data() {
		return {
			records: [],
			days: 7,
			palette: ['#c3a2cc', '#b7b5e0', '#e48cba'],
			paletteIndex: 0,
		};
	},
	methods: {
		...mapActions({
			getSalesRecordFromServer: 'charts/getSalesRecordFromServer',
		}),
		getNewSalesData() {
			this.getSalesRecordFromServer(this.days).then(() => {
				this.records = this.salesData;
			});
		},
		customizePoint(event) {
			let color;
			const condition = event.data.margin > 0;
			color = condition ? '#8f8' : '#f66';

			return { color };
		},
		showTooltip(event) {
			console.log(event);
		},
		customizeTooltip(pointInfo) {
			return {
				text: `Date: ${pointInfo.argumentText}<br/>Sale: ${pointInfo.valueText}`,
			};
		},
	},
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';
</style>
