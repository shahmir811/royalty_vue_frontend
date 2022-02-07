<template>
	<div class="little-padding">
		<h4 class="page-title">Sales History</h4>

		<table class="table table-hover table-striped table-bordered">
			<thead>
				<tr>
					<th>S No.</th>
					<th>Invoice No</th>
					<th>Tax (%)</th>
					<th>Type</th>
					<th>Sale Amount</th>
					<th>Extra Charges</th>
					<th>Sold By</th>
					<th>Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(sale, index) in sales" :key="sale.id">
					<td>{{ ++index }}</td>
					<td>{{ sale.sale_invoice_no }}</td>
					<td>{{ sale.type }}</td>
					<td>{{ sale.tax_percent }}</td>
					<td>{{ sale.total_sale_price }}</td>
					<td>{{ sale.extra_charges }}</td>
					<td>{{ sale.created_by }}</td>
					<td>{{ sale.created_at }}</td>
					<td>
						<router-link
							:to="{
								name: 'sale-details',
								params: { id: sale.id },
							}"
							title="Sale Details"
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
	name: 'CustomerSalesComponent',
	props: ['sales'],
};
</script>

<style lang="scss" scoped>
@import '../../styles/styles.scss';

.little-padding {
	padding: 0 50px;
}

.c-black {
	color: black;
}

.underline {
	text-decoration: underline;
}
</style>
