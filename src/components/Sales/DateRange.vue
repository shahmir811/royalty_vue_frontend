<template>
	<div>
		<date-range-picker
			v-model="dateRange"
			@select="selectFn"
			:ranges="showRanges"
		>
			<div slot="footer" slot-scope="data" class="slot">
				<div>
					<b class="text-black">Calendar footer</b> {{ data.rangeText }}
				</div>
			</div>
		</date-range-picker>

		<button
			class="btn btn-sm btn-primary some-margin"
			@click.prevent="submitFn"
		>
			Submit
		</button>
	</div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import moment from 'moment';

export default {
	name: 'DateRangeComponent',
	components: { DateRangePicker },
	data() {
		return {
			showRanges: false,
			startDate: moment().format('Y-MM-D'),
			endDate: moment().add(10, 'days').format('Y-MM-D'),
			dateRange: {
				startDate: moment().format('Y-MM-D'),
				endDate: moment().add(10, 'days').format('Y-MM-D'),
			},
		};
	},
	filters: {
		date(val) {
			return val ? moment(val).format('Y-MM-D') : '';
		},
	},
	methods: {
		selectFn(event) {
			let { startDate, endDate } = event;

			startDate = moment(startDate).format('Y-MM-D');
			endDate = moment(endDate).format('Y-MM-D');

			this.startDate = startDate;
			this.endDate = endDate;
		},
		submitFn() {
			this.dateRange.startDate = this.startDate;
			this.dateRange.endDate = this.endDate;

			console.log(this.dateRange);

			this.$emit('salesBetween', {
				start: this.dateRange.startDate,
				end: this.dateRange.endDate,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';

.some-margin {
	@extend .ml-2;
	@extend .mb-25;
}
</style>
