<template>
	<table class="table table-striped table-bordered">
		<thead class="">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Location</th>
				<th scope="col">Item</th>
				<th scope="col">Sale Price</th>
				<th scope="col">Quantity</th>
				<th scope="col">Total Amount</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(record, index) in records" :key="index">
				<td>{{ ++index }}</td>
				<td>{{ record.location }}</td>
				<td>{{ record.name }}</td>
				<td>{{ record.sale_price }}</td>
				<td>{{ record.quantity }}</td>
				<td>{{ record.total_price }}</td>
				<td v-if="!disableEdit" class="w-105">
					<button
						class="btn btn sm btm-danger"
						@click.prevent="edit(index - 1)"
					>
						<i class="fa fa-pencil" aria-hidden="true"></i>
					</button>
					<button
						class="btn btn sm btm-danger"
						@click.prevent="remove(index - 1)"
					>
						<i class="fa fa-trash" aria-hidden="true"></i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'SalesTableComponent',
	props: ['records', 'disableEdit'],
	methods: {
		remove(index) {
			this.$emit('itemToDelete', index);
		},
		edit(index) {
			this.$emit('itemToUpdate', index);
		},
	},
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';

.w-105 {
	width: 105px;
}
</style>
