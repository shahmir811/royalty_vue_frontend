<template>
	<div class="homePageWrappingDiv">
		<SalesChartComponent />
		<YearlySaleComponent />
	</div>
</template>

<script>
import SalesChartComponent from '../../../components/Sales/SalesChart.vue';
import YearlySaleComponent from '../../../components/Sales/YealySales.vue';

export default {
	name: 'Home-Page',
	components: {
		SalesChartComponent,
		YearlySaleComponent,
	},
	data() {
		return {
			//
		};
	},
	methods: {
		//
	},
};
</script>

<style lang="scss" scoped>
@import '../../../styles/styles.scss';

.homePageWrappingDiv {
	@extend .pb-50;
}
</style>
