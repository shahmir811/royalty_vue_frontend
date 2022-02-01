<template>
	<div class="yearlySalesWrappingDiv">
		<div class="year-dropdown-div">
			<h3 class="year-title">Select Year</h3>
			<select
				class="custom-select w-40"
				v-model="selectedYear"
				@change.prevent="fetchDataSource"
			>
				<option :value="record" :key="record" v-for="record in yearOptions">
					{{ record }}
				</option>
			</select>
		</div>

		<template v-if="!fetchingSales">
			<DxChart
				id="chart"
				:data-source="dataSource"
				palette="Soft"
				:customize-point="customizePoint"
			>
				<DxSeries
					argument-field="Month"
					value-field="margin"
					name="Sales"
					type="bar"
					color="#bfb"
				/>
				<DxExport :enabled="true" />
				<DxTitle :text="yearlySalesTitle" subtitle="(in AED amount)" />
				<DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
			</DxChart>
		</template>
		<template v-else>
			<p>Fetching records ...</p>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
	DxChart,
	DxSeries,
	DxTitle,
	DxExport,
	DxTooltip,
} from 'devextreme-vue/chart';
import moment from 'moment';

export default {
	name: 'YearlySaleComponent',
	components: {
		DxChart,
		DxSeries,
		DxTitle,
		DxExport,
		DxTooltip,
	},
	mounted() {
		this.addYearsRecord();
		this.fetchDataSource();
	},
	computed: {
		...mapGetters({
			yearlySalesTitle: 'charts/yearlySalesTitle',
			fetchingSales: 'charts/fetchingSales',
			yearlySales: 'charts/yearlySales',
		}),
	},
	data() {
		return {
			selectedYear: moment().format('YYYY'),
			yearOptions: [],
			dataSource: [],
		};
	},
	methods: {
		...mapActions({
			getYearlySalesRecordFromServer: 'charts/getYearlySalesRecordFromServer',
		}),
		fetchDataSource() {
			this.getYearlySalesRecordFromServer(this.selectedYear).then(() => {
				this.dataSource = this.yearlySales;
			});
		},
		customizePoint(event) {
			let color;
			const condition = event.data.margin > 0;
			color = condition ? '#8f8' : '#f66';

			return { color };
		},
		addYearsRecord() {
			const start = moment().subtract(10, 'years').format('YYYY');
			const end = moment().add(10, 'years').format('YYYY');

			for (let i = start; i <= end; i++) {
				this.yearOptions.push(parseInt(i));
			}
		},
		customizeTooltip(pointInfo) {
			return {
				text: `Month: ${pointInfo.argumentText}<br/>Sale: ${pointInfo.valueText}`,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';
#chart {
	height: 440px;
}

.yearlySalesWrappingDiv {
	margin: 50px 0 !important;
}

.year-dropdown-div {
	display: flex;
	align-items: center;
}

.year-title {
	width: 50%;
}

.w-40 {
	width: 40% !important;
}
</style>
