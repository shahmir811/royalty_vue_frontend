<template>
	<div>
		<div class="grid-container grey-bg">
			<div class="grid-item">
				<h5>Sale Invoice No:</h5>
				<p>{{ data.sale_invoice_no }}</p>
			</div>

			<div class="grid-item">
				<h5>Tax (%):</h5>
				<p>{{ data.tax }}</p>
			</div>

			<div class="grid-item">
				<h5>Sale Quotation:</h5>
				<p>{{ data.quotation_details }}</p>
			</div>

			<div class="grid-item">
				<h5>Type:</h5>
				<p>{{ data.type }}</p>
			</div>

			<div class="grid-item">
				<h5>Customer Name:</h5>
				<p>{{ data.customer_name }}</p>
			</div>

			<div class="grid-item">
				<h5>Contact No:</h5>
				<p>{{ data.contact_no }}</p>
			</div>

			<div class="grid-item">
				<h5>Shipping Location:</h5>
				<p>{{ data.shipping_location }}</p>
			</div>

			<div class="grid-item">
				<h5>Extra Charges:</h5>
				<p>{{ data.extra_charges }}</p>
			</div>

			<div class="grid-item">
				<h5>Status:</h5>
				<p>{{ data.status }}</p>
			</div>

			<div class="grid-item">
				<button
					class="btn btn-secondary mr-2"
					@click.prevent="changeMode"
					v-if="!disableEdit"
				>
					<i class="fa fa-pencil" aria-hidden="true"></i> Edit
				</button>
				<button class="btn btn-danger" @click.prevent="goToSalesPage">
					<i class="fa fa-chevron-left" aria-hidden="true"></i> Back
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SaleDetail',
	props: ['data', 'disableEdit'],
	methods: {
		changeMode() {
			this.$emit('changeToEditMode', true);
		},
		goToSalesPage() {
			this.$router.push('/sales');
		},
	},
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';

.grid-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
}

.grid-item {
	text-align: left;
	padding: 20px 10px;
}

.grey-bg {
	background-color: #e0e0e0;
}

.underline {
	text-decoration: underline;
}
</style>
