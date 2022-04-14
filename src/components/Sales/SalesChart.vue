<template>
	<div>
		<div class="grid-container">
			<div class="grid-item">
				<input type="radio" id="dropdown" value="dropdown" v-model="picked" />
				<label for="dropdown">DropDown</label>
			</div>

			<div class="grid-item">
				<input type="radio" id="dateRange" value="dateRange" v-model="picked" />
				<label for="dateRange">DateRange</label>
			</div>

			<div class="grid-item">
				<template v-if="picked === 'dropdown'">
					<select class="custom-select w-60" v-model="selectedRecord">
						<option :value="record.option" :key="record.id" v-for="record in records">
							{{ record.label }}
						</option>
					</select>
				</template>
				<template v-else>
					<DateRange @salesBetween="salesBetweenDates" />
				</template>
			</div>
		</div>

		<template v-if="salesData.length > 0 && !loading">
			<DxChart
				id="chart"
				:data-source="data"
				title="Gross State Product within the Great Lakes Region"
				@pointClick="onPointClick"
			>
				<DxCommonSeriesSettings
					:bar-padding="0.3"
					argument-field="day"
					type="bar"
					hover-mode="allArgumentPoints"
					selection-mode="allArgumentPoints"
				>
					<DxLabel :visible="true">
						<DxFormat :precision="0" type="fixedPoint" />
					</DxLabel>
				</DxCommonSeriesSettings>
				<DxSeries value-field="sale" name="Sale" />
				<DxSeries value-field="margin" name="Profit" color="#82EB8E" />
				<DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
				<DxExport :enabled="true" />
				<DxTitle :text="title" subtitle="(in AED amount)" />
			</DxChart>
		</template>
	</div>
</template>

<script>
import DateRange from './DateRange.vue';
import { mapGetters, mapActions } from 'vuex';

import {
	DxChart,
	DxSeries,
	DxCommonSeriesSettings,
	DxLabel,
	DxFormat,
	DxLegend,
	DxExport,
	DxTitle,
} from 'devextreme-vue/chart';

export default {
	name: 'SalesChartComponent',
	props: [],
	mounted() {
		this.getSalesRecordFromServer(this.days).then(() => {
			this.data = this.salesData;
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
		// DxSize,
		DxChart,
		DxSeries,
		DxExport,
		DxCommonSeriesSettings,
		DxTitle,
		// DxTooltip,
		DxLabel,
		DxFormat,
		DxLegend,
		DateRange,
	},
	data() {
		return {
			data: [],
			days: 7,
			palette: ['#c3a2cc', '#b7b5e0', '#e48cba'],
			paletteIndex: 0,
			picked: 'dropdown',
			records: [
				{ id: 1, option: 7, label: 'Last 7 days' },
				{ id: 2, option: 10, label: 'Last 10 days' },
				{ id: 3, option: 30, label: 'Last 30 days' },
			],
			selectedRecord: 7,
			salesRecord: [],
		};
	},
	methods: {
		...mapActions({
			getSalesRecordFromServer: 'charts/getSalesRecordFromServer',
			getSalesRecordBetweenSpecificDates: 'charts/getSalesRecordBetweenSpecificDates',
		}),
		getNewSalesData() {
			this.getSalesRecordFromServer(this.days).then(() => {
				this.data = this.salesData;
			});
		},
		customizePoint(event) {
			let color;
			const condition = event.data.margin > 0;
			color = condition ? '#8f8' : '#f66';

			return { color };
		},
		customizeTooltip(pointInfo) {
			return {
				text: `Date: ${pointInfo.argumentText}<br/>Sale: ${pointInfo.valueText}`,
			};
		},
		salesBetweenDates(datesRecord) {
			this.getSalesRecordBetweenSpecificDates(datesRecord).then(() => {
				this.data = this.salesData;
			});
		},
		onPointClick({ target }) {
			target.select();
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';

.grid-container {
	@extend .mt-25;
	display: grid;
	grid-template-columns: 1fr 1fr 4fr;
	background-color: $NAVBAV_BASE_COLOR;
	padding: 10px;
	height: auto;
}

.grid-item {
	background-color: rgba(255, 255, 255, 0.8);
	padding: 20px;
}

.w-60 {
	width: 60%;
}
</style>
