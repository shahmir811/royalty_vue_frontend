<template>
	<div class="homePageWrappingDiv">
		<template v-if="role === 'admin'">
			<SalesChartComponent />
			<YearlySaleComponent />
		</template>
		<template v-else>
			<h3>Welcome home</h3>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import SalesChartComponent from '../../../components/Sales/SalesChart.vue';
import YearlySaleComponent from '../../../components/Sales/YealySales.vue';

export default {
	name: 'Home-Page',
	computed: {
		...mapGetters({
			role: 'auth/role',
		}),
	},
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
