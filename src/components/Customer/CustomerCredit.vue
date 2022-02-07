<template>
	<div class="little-padding">
		<h4 class="page-title">Credit History</h4>

		<table class="table table-hover table-striped table-bordered">
			<thead>
				<tr>
					<th>S No.</th>
					<th>Invoice No</th>
					<th>Total</th>
					<th>Due Amount</th>
					<th>Sale Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(cre, index) in credit" :key="cre.id">
					<td>{{ ++index }}</td>
					<td>{{ cre.sale_invoice_no }}</td>
					<td>{{ cre.total }}</td>
					<td>{{ cre.due_amount }}</td>
					<td>{{ cre.sale_date }}</td>
					<td>
						<router-link
							:to="{
								name: 'credit-payment-details',
								params: { creditId: cre.id },
							}"
							title="View Payments"
							target="_blank"
						>
							<i class="fa fa-bars c-black" aria-hidden="true"></i>
						</router-link>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'CustomerCreditComponent',
	props: ['credit'],
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';

.little-padding {
	padding: 0 50px;
}

.underline {
	text-decoration: underline;
}

.c-black {
	color: black;
}
</style>
