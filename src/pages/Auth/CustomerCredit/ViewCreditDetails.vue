<template>
	<div class="pb-50">
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
					<b-button class="admin-users-component-add-new-inventory-button w-230 ml-2"
						><i class="fa fa-arrow-left" aria-hidden="true"></i> Credit Management
					</b-button>
				</router-link>
			</b-row>
			<div class="jumbotron style-jumbotron">
				<h3 class="text-center">New Credit Record</h3>

				<b-form @submit.prevent="submitForm">
					<div class="grid-container">
						<div class="grid-item">
							<label for="selectSale" class="style-label">Select Sale</label>
							<select
								class="form-control"
								id="selectSale"
								v-model="form.selectedSale"
								:class="{ 'is-invalid': errors.sale_id }"
							>
								<option value="" selected disabled>Select Sales Invoice</option>
								<option v-for="sale in salesRecord" :key="sale.id" :value="sale.id">
									{{ sale.sale_invoice_no }}
								</option>
							</select>
						</div>
						<div class="grid-item">
							<b-form-group id="input-group-1" label="Total Amount:" label-for="input-1" class="input-form-label">
								<b-form-input
									id="input-1"
									type="number"
									v-model="form.total"
									placeholder="Enter total amount to be paid"
									:class="{ 'is-invalid': errors.total }"
									:disabled="!form.selectedSale || serverRequest"
								></b-form-input>
								<span class="invalid-feedback left-text" v-if="errors.total">
									<strong>{{ errors.total[0] }}</strong>
								</span>
							</b-form-group>
						</div>
						<div class="grid-item">
							<b-form-group id="input-group-2" label="Due Amount:" label-for="input-2" class="input-form-label">
								<b-form-input
									id="input-2"
									type="number"
									v-model="form.dueAmount"
									placeholder="Due amount"
									:class="{ 'is-invalid': errors.dueAmount }"
									:disabled="!form.total || serverRequest"
								></b-form-input>
								<span class="invalid-feedback left-text" v-if="errors.dueAmount">
									<strong>{{ errors.dueAmount[0] }}</strong>
								</span>
								<span class="errorText" v-if="greaterAmount">
									Due amount must be less than or equal to total amount.
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-7" label="Due Amount:" label-for="input-7" class="input-form-label">
								<b-form-datepicker
									v-model="form.dueDate"
									class="mb-2"
									:disabled="!form.dueAmount || serverRequest"
								></b-form-datepicker>

								<span class="invalid-feedback left-text" v-if="errors.dueDate">
									<strong>{{ errors.dueDate[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item"></div>
						<div class="grid-item"></div>

						<div class="grid-item">
							<b-button type="submit" variant="success" class="admin-add-user-add-button" :disabled="disableButton">
								<template v-if="serverRequest"><b-spinner small label="Small Spinner"></b-spinner></template>
								<template v-else><i class="fa fa-floppy-o" aria-hidden="true"></i> Submit</template>
							</b-button>
						</div>
					</div>
				</b-form>
			</div>
			<b-row> </b-row>

			<div class="row little-adjust">
				<table class="table table-striped table-hover table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Sale Invoice #</th>
							<th>Sold On</th>
							<th>Due Amount</th>
							<th>Due Date</th>
							<th>Total</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(credit, index) in credits" :key="credit.id" :class="{ lessDueDate: colorRow(credit) }">
							<td>{{ ++index }}</td>
							<td>{{ credit.sale_invoice_no }}</td>
							<td>{{ credit.sale_date }}</td>
							<td>{{ credit.due_amount }}</td>
							<td>{{ credit.due_date }}</td>
							<td>{{ credit.total }}</td>
							<td>
								<router-link
									:to="{
										name: 'credit-payment-details',
										params: { creditId: credit.id },
									}"
									class="btn btn-sm style-link"
									><i class="fa fa-eye" aria-hidden="true"></i> Payments</router-link
								>
								<a
									v-if="role === 'admin'"
									class="btn btn-sm btn-link style-remove-link"
									@click.prevent="remove(credit.id)"
									><i class="fa fa-trash" aria-hidden="true"></i> Remove</a
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
			this.salesRecord = this.customerSales;
		});
	},
	components: { Spinner },
	computed: {
		...mapGetters({
			role: 'auth/role',
			fetchingCreditDetails: 'credit/fetchingCreditDetails',
			selectedCustomerName: 'credit/selectedCustomerName',
			creditRecords: 'credit/creditRecords',
			errors: 'credit/errors',
			serverRequest: 'credit/serverRequest',
			customerSales: 'credit/customerSales',
		}),
		greaterAmount() {
			const condition = this.form.dueAmount && parseFloat(this.form.dueAmount) > parseFloat(this.form.total);
			return condition ? true : false;
		},
		disableButton() {
			return this.serverRequest || this.greaterAmount || !this.form.dueAmount || !this.form.dueDate;
		},
	},
	data() {
		return {
			credits: [],
			customerId: null,
			salesRecord: [],
			form: {
				total: null,
				dueAmount: null,
				selectedSale: '',
				dueDate: '',
			},
		};
	},
	methods: {
		...mapActions({
			fetchRecords: 'credit/fetchCustomerCreditsDetailsFromServer',
			removeRecord: 'credit/removeCreditRecordFromServer',
			addRecord: 'credit/addNewCustomerCreditRecordOnServer',
		}),
		remove(id) {
			this.$swal
				.fire({
					title: 'Are you sure to remove this record?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						this.removeRecord(id).then(() => {
							this.credits = this.creditRecords;
							this.salesRecord = this.customerSales;
							this.$swal.fire('Done!', 'Record has been removed.', 'success');
						});
					}
				});
		},
		submitForm() {
			const data = {
				customer_id: this.customerId,
				sale_id: this.form.selectedSale,
				due_amount: this.form.dueAmount,
				due_date: this.form.dueDate,
				total_amount_paid: this.form.total,
			};

			this.addRecord(data).then(() => {
				this.credits = this.creditRecords;
				this.salesRecord = this.customerSales;

				this.resetForm();
			});
		},
		colorRow(data) {
			const condition = data.days_diff < 7 && data.due_amount !== '0.00';
			return condition;
		},
		resetForm() {
			this.form.total = null;
			this.form.dueAmount = null;
			this.form.dueDate = '';
			this.form.selectedSale = '';
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../../styles/styles.scss';

.customerNameClass {
	text-decoration: underline;
}

.style-jumbotron {
	padding-bottom: 0px;
	padding-top: 25px;
	margin-top: 25px;
}

.little-adjust {
	@extend .mt-30;
	padding: 0 50px;
}

.style-link {
	text-decoration: underline;
	font-weight: bold;
}

.style-remove-link {
	text-decoration: underline;
	color: red;
}

.style-label {
	text-align: left;
	color: #542600;
	margin-bottom: 20px;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
}

.errorText {
	color: red;
	font-weight: bold;
}
</style>
