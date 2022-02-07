<template>
	<div class="showCustomer-wrapping-div">
		<h1 class="page-title">Customer Details</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<div class="jumbotron">
				<div class="grid-container">
					<div class="grid-item">
						<h4 class="label-text">Name:</h4>
						<p>{{ details && details.customer.name }}</p>
					</div>
					<div class="grid-item">
						<h4 class="label-text">Mark:</h4>
						<p>{{ details && details.customer.mark }}</p>
					</div>
					<div class="grid-item">
						<h4 class="label-text">Credit Amount:</h4>
						<p>{{ details && details.customer.credit_amount }}</p>
					</div>

					<div class="grid-item">
						<h4 class="label-text">Dubai Contact:</h4>
						<p>{{ details && details.customer.mobile_no_dubai }}</p>
					</div>
					<div class="grid-item">
						<h4 class="label-text">Country:</h4>
						<p>{{ details && details.customer.country }}</p>
					</div>
					<div class="grid-item">
						<h4 class="label-text">Country Contact:</h4>
						<p>{{ details && details.customer.mobile_no_dubai }}</p>
					</div>

					<!-- Next row -->

					<div class="grid-item">
						<h4 class="label-text">Cargo Address:</h4>
						<p>{{ details && details.customer.cargo_address }}</p>
					</div>
					<div class="grid-item">
						<h4 class="label-text">Status:</h4>
						<p>{{ details && details.customer.status }}</p>
					</div>
					<div class="grid-item"></div>
				</div>
			</div>

			<div class="row little-left-padding">
				<h5>
					<a
						href="#"
						class="style-link-tag"
						:class="{ selected: showSales }"
						@click.prevent="setShowSales(true)"
						>Sales History</a
					>
					|
					<a
						href="#"
						class="style-link-tag"
						:class="{ selected: !showSales }"
						@click.prevent="setShowSales(false)"
						>Credit History</a
					>
				</h5>
			</div>

			<template v-if="showSales">
				<CustomerSales :sales="details && details.sales" />
			</template>

			<template v-else>
				<CustomerCredit :credit="details && details.credit" />
			</template>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Spinner from '../../../components/Spinner/Spinner.vue';
import CustomerSales from '../../../components/Customer/CustomerSales.vue';
import CustomerCredit from '../../../components/Customer/CustomerCredit.vue';

export default {
	name: 'ShowCustomerPage',
	mounted() {
		this.customerId = this.$route.params.id;

		if (!this.customerId) {
			this.$router.push('/customers');
			return false;
		}

		this.show(this.customerId).then(() => {
			this.details = this.customerDetails;
		});
	},
	components: {
		Spinner,
		CustomerSales,
		CustomerCredit,
	},
	computed: {
		...mapGetters({
			pageLoad: 'customer/pageLoad',
			customerDetails: 'customer/customerDetails',
		}),
	},
	data() {
		return {
			details: null,
			customerId: null,
			showSales: true,
		};
	},
	methods: {
		...mapActions({
			show: 'customer/showCustomerDetails',
		}),
		setShowSales(trueOrFalse) {
			this.showSales = trueOrFalse;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../../styles/styles.scss';

.style-link-tag {
	color: black;

	&:hover {
		color: black;
	}
}

.selected {
	text-decoration: underline;
}

.little-left-padding {
	padding-left: 15px;
}

.showCustomer-wrapping-div {
	padding-bottom: 50px;
}
</style>
