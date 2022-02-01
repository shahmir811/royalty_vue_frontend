<template>
	<div>
		<h1 class="page-title">Welcome Home</h1>

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
						<option
							:value="record.option"
							:key="record.id"
							v-for="record in records"
						>
							{{ record.label }}
						</option>
					</select>
				</template>
				<template v-else>
					<p>Display date Range</p>
				</template>
			</div>
		</div>

		<SalesChartComponent :selectedRecord="selectedRecord" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SalesChartComponent from '../../../components/Sales/SalesChart.vue';

export default {
	name: 'Home-Page',
	components: {
		SalesChartComponent,
	},
	mounted() {
		// this.getSalesRecordFromServer(this.selectedRecord).then(() => {
		// 	this.salesRecord = this.salesData;
		// });
	},
	computed: {
		...mapGetters({
			salesData: 'charts/salesData',
		}),
	},
	data() {
		return {
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
		}),
	},
};
</script>

<style lang="scss" scoped>
@import '../../../styles/styles.scss';

.grid-container {
	display: grid;
	grid-template-columns: 1fr 1fr 4fr;
	background-color: #2196f3;
	padding: 10px;
	// height: 80vh;
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
