<template>
	<div>
		<h1 class="page-title">Customers Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-customer">
					<b-button class="admin-users-component-add-new-customer-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add
						Customer</b-button
					>
				</router-link>
			</b-row>

			<b-row class="pr-20">
				<table class="table table-hover">
					<thead class="table-header-class">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Country</th>
							<th>Dubai Contact</th>
							<th>Country Contact</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(customer, index) in customers" :key="customer.id">
							<td scope="row">{{ ++index }}</td>
							<td>{{ customer.name }}</td>
							<td>{{ customer.country }}</td>
							<td>{{ customer.mobile_no_dubai }}</td>
							<td>{{ customer.mobile_no_country }}</td>
							<td :class="customer.status">{{ customer.status }}</td>
							<td>
								<router-link
									class="update-user-link mr-2"
									:to="{
										name: 'update-customer',
										params: { id: customer.id },
									}"
								>
									<i class="fa fa-pencil" aria-hidden="true"></i>
								</router-link>
								<a
									v-if="role === 'admin'"
									href="#"
									class="update-user-delete-link"
									@click.prevent="onDeleteHandler(customer.id)"
									><i class="fa fa-handshake-o" aria-hidden="true"></i
								></a>
							</td>
						</tr>
					</tbody>
				</table>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'CustomersPage',
	mounted() {
		this.fetchCustomers();
	},
	components: {
		Spinner,
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			customers: 'customer/customers',
			pageLoad: 'customer/pageLoad',
			errors: 'customer/errors',
		}),
	},
	methods: {
		...mapActions({
			fetchCustomers: 'customer/fetchCustomers',
			changeCustomerStatus: 'customer/changeCustomerStatus',
		}),
		onDeleteHandler(customerId) {
			this.$swal
				.fire({
					title: 'Are you sure to change this customer status?',
					// text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, change it!',
				})
				.then(result => {
					if (result.value) {
						this.changeCustomerStatus(customerId).then(() => {
							this.$swal.fire(
								'Done!',
								'Customer status has been changed.',
								'success'
							);
						});
					}
				});
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.admin-users-component-add-new-customer-button {
	width: 160px;
	height: 45px;
	background: $BROWN-10 !important;
	margin-bottom: 15px;

	a {
		@extend .regular-16px-24px;
		color: $GREY-1 !important;

		&:hover {
			outline: none;
			border: none;
		}

		&:hover {
			@extend .regular-16px-24px;
			background: $BROWN-11 !important;
		}
	}
}
</style>
