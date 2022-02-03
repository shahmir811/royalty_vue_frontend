<template>
	<div>
		<template v-if="fetchingCreditDetails">
			<Spinner />
		</template>

		<template v-else>
			<h1 class="page-title">
				Credit Details of
				<span class="customerNameClass">{{ selectedCustomerName }}</span>
			</h1>

			<b-row>
				<router-link
					:to="{
						name: 'customer-credit',
					}"
				>
					<b-button
						class="admin-users-component-add-new-inventory-button w-230 ml-2"
						><i class="fa fa-arrow-left" aria-hidden="true"></i> Credit
						Management
					</b-button>
				</router-link>
			</b-row>

			<div class="row little-adjust">
				<table class="table table-striped table-hover table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Sale Invoice #</th>
							<th>Sold On</th>
							<th>Due Amount</th>
							<th>Total</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(credit, index) in credits" :key="credit.id">
							<td>{{ ++index }}</td>
							<td>{{ credit.sale_invoice_no }}</td>
							<td>{{ credit.sale_date }}</td>
							<td>{{ credit.due_amount }}</td>
							<td>{{ credit.total }}</td>
							<td>
								<router-link
									:to="{
										name: 'credit-payment-details',
										params: { creditId: credit.id },
									}"
									class="btn btn-sm style-link"
									><i class="fa fa-eye" aria-hidden="true"></i>
									Payments</router-link
								>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'ViewCreditDetailsPage',
	mounted() {
		this.customerId = this.$route.params.customerId;

		if (!this.customerId) {
			this.$router.push('/customer-credit');
			return;
		}

		this.fetchRecords(this.customerId).then(() => {
			this.credits = this.creditRecords;
		});
	},
	components: { Spinner },
	computed: {
		...mapGetters({
			fetchingCreditDetails: 'credit/fetchingCreditDetails',
			selectedCustomerName: 'credit/selectedCustomerName',
			creditRecords: 'credit/creditRecords',
		}),
	},
	data() {
		return {
			credits: [],
			customerId: null,
		};
	},
	methods: {
		...mapActions({
			fetchRecords: 'credit/fetchCustomerCreditsDetailsFromServer',
		}),
	},
};
</script>

<style lang="scss" scoped>
@import '../../../styles/styles.scss';

.customerNameClass {
	text-decoration: underline;
}

.little-adjust {
	@extend .mt-30;
	padding: 0 50px;
}

.style-link {
	text-decoration: underline;
	font-weight: bold;
}
</style>
