<template>
	<div>
		<template v-if="weeklySale.length > 0">
			<DxChart id="weeklyChart" :data-source="weeklyData">
				<DxSeries
					argument-field="DayName"
					value-field="margin"
					name="Sales last week"
					type="bar"
					color="#ffaa66"
				/>
				<DxExport :enabled="true" />
				<DxTitle text="Last 07 days Sale" subtitle="(in AED amount)" />
			</DxChart>
		</template>
		<template v-else>
			<p>Loadin...</p>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { DxChart, DxSeries, DxExport, DxTitle } from 'devextreme-vue/chart';
// import { weeklyData } from './dummyData';

export default {
	name: 'WeeklySaleComponent',
	mounted() {
		this.getWeeklySales().then(() => {
			this.weeklyData = this.weeklySale;
		});
	},
	computed: {
		...mapGetters({
			weeklySale: 'charts/weeklySale',
		}),
	},
	components: {
		DxChart,
		DxSeries,
		DxExport,
		DxTitle,
	},
	data() {
		return {
			weeklyData: [],
		};
	},
	methods: {
		...mapActions({
			getWeeklySales: 'charts/getWeeklySales',
		}),
	},
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';

#weeklyChart {
	// height: 440px;
}
</style>
