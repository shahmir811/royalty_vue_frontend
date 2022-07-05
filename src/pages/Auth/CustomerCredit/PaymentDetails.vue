<template>
	<div>
		<h1 class="page-title">Payment Details</h1>

		<template v-if="fetchingPaymentDetails">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link
					:to="{
						name: 'view-credit-details',
						params: { customerId: selectedCustomerId },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-arrow-left" aria-hidden="true"></i> Back
					</b-button>
				</router-link>
				<b-button
					v-if="records.length > 0"
					class="admin-users-component-add-new-inventory-button w-195 ml-2"
					@click.prevent="printPaymentDetails"
					><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Print</b-button
				>
			</b-row>

			<h4 class="label-style">Add Payment</h4>

			<form class="form-style" @submit.prevent="submitForm">
				<b-row>
					<b-col>
						<div class="form-group mb-2">
							<label for="inputAmount" class="sr-only">Amount</label>
							<input
								type="number"
								class="form-control w-480"
								:class="{ 'is-invalid': errors.amount }"
								id="inputAmount"
								placeholder="Amount"
								v-model="amount"
							/>
							<span class="invalid-feedback left-text" v-if="errors.amount">
								<strong>{{ errors.amount[0] }}</strong>
							</span>
							<span class="showErrorMessage" v-if="greaterAmount"> Amount should be less than remaining amount </span>
						</div>
					</b-col>

					<b-col>
						<div class="form-group mb-2">
							<label for="inputPaidBy" class="sr-only">Paid by</label>
							<input
								type="text"
								class="form-control w-480"
								:class="{ 'is-invalid': errors.paid_by }"
								id="inputPaidBy"
								placeholder="Paid By"
								v-model="paid_by"
							/>
							<span class="invalid-feedback left-text" v-if="errors.paid_by">
								<strong>{{ errors.paid_by[0] }}</strong>
							</span>
						</div>
					</b-col>
				</b-row>

				<b-row class="mr-10">
					<b-col>
						<div class="form-group mb-2">
							<label for="inputReason" class="sr-only">Reason</label>
							<input
								type="text"
								class="form-control w-480"
								:class="{ 'is-invalid': errors.reason }"
								id="inputReason"
								placeholder="Reason"
								v-model="reason"
							/>
							<span class="invalid-feedback left-text" v-if="errors.reason">
								<strong>{{ errors.reason[0] }}</strong>
							</span>
						</div>
					</b-col>
				</b-row>

				<b-row>
					<b-col>
						<button
							type="submit"
							class="admin-add-user-add-button"
							:class="{
								disable: serverRequest || disableButton || greaterAmount,
							}"
							:disabled="serverRequest || disableButton || greaterAmount"
						>
							<template v-if="serverRequest"><b-spinner small label="Small Spinner"></b-spinner></template>
							<template v-else><i class="fa fa-floppy-o" aria-hidden="true"></i> Add</template>
						</button>
					</b-col>
				</b-row>
			</form>

			<div class="amount-display-div">
				<h3>Remaining:</h3>
				<h5 class="red-text">{{ dueAmount }}</h5>

				<h3>Total:</h3>
				<h5>{{ total }}</h5>
			</div>

			<div class="row little-adjust">
				<table class="table table-striped table-hover table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Serial Number</th>
							<th>Amount</th>
							<th>Paid By</th>
							<th>Reason</th>
							<th>Received By</th>
							<th>Received Date</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(record, index) in records" :key="record.id">
							<td>{{ ++index }}</td>
							<td>{{ record.serial_number }}</td>
							<td>{{ record.amount }}</td>
							<td>{{ record.paid_by }}</td>
							<td>{{ record.reason }}</td>
							<td>{{ record.received_by }}</td>
							<td>{{ record.received_date }}</td>
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
	name: 'PaymentDetailsPage',
	mounted() {
		this.creditId = this.$route.params.creditId;
		if (!this.creditId) {
			this.$router.push('/customer-credit');
			return;
		}
		this.fetchPayments(this.creditId).then(() => {
			this.records = this.payments;
		});
	},
	components: { Spinner },
	computed: {
		...mapGetters({
			total: 'credit/total',
			dueAmount: 'credit/dueAmount',
			payments: 'credit/payments',
			selectedCustomerId: 'credit/selectedCustomerId',
			fetchingPaymentDetails: 'credit/fetchingPaymentDetails',
			errors: 'credit/errors',
			serverRequest: 'credit/serverRequest',
		}),
		disableButton() {
			const condition = this.total && this.dueAmount <= 0;
			return condition ? true : false;
		},
		greaterAmount() {
			const condition = this.dueAmount && this.amount > this.dueAmount;
			return condition ? true : false;
		},
	},
	data() {
		return {
			creditId: null,
			records: [],
			amount: '',
			paid_by: '',
			reason: '',
		};
	},
	methods: {
		...mapActions({
			fetchPayments: 'credit/fetchPaymentDetailsFromServer',
			print: 'credit/printPaymentDetailsOnServer',
			addPayment: 'credit/addPaymentToServer',
		}),
		printPaymentDetails() {
			this.print(this.creditId);
		},
		submitForm() {
			if (!this.amount || this.amount < 0) {
				return false;
			}
			const data = {
				creditId: this.creditId,
				amount: this.amount,
				paid_by: this.paid_by,
				reason: this.reason,
			};

			this.$swal
				.fire({
					title: 'Are you sure to add the payment record?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, add it!',
				})
				.then(result => {
					if (result.value) {
						this.addPayment(data)
							.then(() => {
								this.amount = '';
								this.records = this.payments;
								this.$swal.fire('Done!', 'Payment record has been added.', 'success');
							})
							.catch(() => {
								this.$swal.fire({
									icon: 'error',
									title: 'Oops...',
									text: 'Something went wrong!, please try again later',
								});
							});
					}
				});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../../styles/styles.scss';

.little-adjust {
	@extend .mt-30;
	padding: 0 50px;
}

.label-style {
	@extend .pb-25;
	text-align: center;
	color: #542600;
	font-weight: bold;
	// font-size: 16px;
	line-height: 24px;
	// margin: 0 !important;
}

.form-style {
	width: 75%;
	@extend .mt-20;
	height: 100px;
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
	padding-left: 35px;
}

.admin-add-user-add-button {
	width: 107px;
	background: $BROWN-10 !important;
	margin-bottom: 7px;
	color: white;
}

.is-invalid {
	margin: 0 !important;
}

.amount-display-div {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	line-height: 20px;
	margin: 25px 0px;
}

.disabled {
	opacity: 0.5 !important;
	pointer-events: none;
}

.showErrorMessage {
	color: red;
	@extend .mt-2;
}
</style>
