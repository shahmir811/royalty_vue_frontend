<template>
	<div>
		<h1 class="page-title">Sale Details</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<template v-if="!editSaleForm">
				<Detail :data="saleForm" @changeToEditMode="changeSaleEditMode" />
			</template>

			<template v-else>
				<b-form @submit.prevent="submitSaleForm">
					<div class="grid-container">
						<div class="grid-item">
							<b-form-group
								id="input-group-1"
								label="Sale Invoice No:"
								label-for="input-1"
								class="input-form-label"
							>
								<b-form-input
									id="input-1"
									v-model="saleForm.sale_invoice_no"
									placeholder="Sale Invoice No:"
									:disabled="role == 'employee'"
								></b-form-input>
								<small v-if="fetchInvoiceNo">
									Fetching latest invoice number ...
								</small>
								<span
									class="invalid-feedback left-text"
									v-if="errors.sale_invoice_no"
								>
									<strong>{{ errors.sale_invoice_no[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-1"
								label="Tax (%):"
								label-for="input-1"
								class="input-form-label"
							>
								<b-form-input
									id="input-1"
									v-model="saleForm.tax"
									placeholder="Tax Percent:"
									disabled
									:class="{ 'is-invalid': errors.tax_percent }"
								></b-form-input>
								<span
									class="invalid-feedback left-text"
									v-if="errors.tax_percent"
								>
									<strong>{{ errors.tax_percent[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-2"
								label="Sale Quotation:"
								label-for="input-2"
								class="input-form-label"
							>
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.quotation"
									:class="{ 'is-invalid': errors.quotation }"
								>
									<option value="0">False</option>
									<option value="1">True</option>
								</select>
								<span
									class="invalid-feedback left-text"
									v-if="errors.quotation"
								>
									<strong>{{ errors.quotation[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-3"
								label="Type:"
								label-for="input-3"
								class="input-form-label"
							>
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.type"
									:class="{ 'is-invalid': errors.type }"
								>
									<option value="export">Export</option>
									<option value="local">Local</option>
								</select>
								<span class="invalid-feedback left-text" v-if="errors.type">
									<strong>{{ errors.type[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-4"
								label="Customer:"
								label-for="input-4"
								class="input-form-label"
							>
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.customer_id"
									@change.prevent="onCustomerChangeHandler"
									:class="{ 'is-invalid': errors.customer_id }"
								>
									<option selected disabled value="null">
										Select Customer
									</option>
									<option
										v-for="customer in customers"
										:key="customer.id"
										:value="customer.id"
										:disabled="customer.status !== 'Active'"
									>
										{{ customer.name }}
									</option>
								</select>
								<span
									class="invalid-feedback left-text"
									v-if="errors.customer_id"
								>
									<strong>{{ errors.customer_id[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-5"
								label="Contact No:"
								label-for="input-5"
								class="input-form-label"
							>
								<b-form-input
									id="input-5"
									v-model="saleForm.contact_no"
									placeholder="Contact No:"
									:class="{ 'is-invalid': errors.contact_no }"
								></b-form-input>
								<span
									class="invalid-feedback left-text"
									v-if="errors.contact_no"
								>
									<strong>{{ errors.contact_no[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-6"
								label="Shipping Location:"
								label-for="input-6"
								class="input-form-label"
							>
								<b-form-textarea
									id="input-6"
									v-model="saleForm.shipping_location"
									placeholder="Cargo address"
									:class="{ 'is-invalid': errors.shipping_location }"
								></b-form-textarea>
								<span
									class="invalid-feedback left-text"
									v-if="errors.shipping_location"
								>
									<strong>{{ errors.shipping_location[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-7"
								label="Extra Charges:"
								label-for="input-7"
								class="input-form-label"
							>
								<b-form-input
									id="input-7"
									v-model="saleForm.extra_charges"
									placeholder="Extra Charges:"
									:class="{ 'is-invalid': errors.extra_charges }"
								></b-form-input>
								<span
									class="invalid-feedback left-text"
									v-if="errors.extra_charges"
								>
									<strong>{{ errors.extra_charges[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group
								id="input-group-9"
								label="Status:"
								label-for="input-9"
								class="input-form-label"
							>
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.status_id"
									:class="{ 'is-invalid': errors.status_id }"
									@change="onStatusChangeHandler"
								>
									<option selected disabled value="null">Select Status</option>
									<option
										v-for="status in statuses"
										:key="status.id"
										:value="status.id"
									>
										{{ status.name }}
									</option>
								</select>
								<span
									class="invalid-feedback left-text"
									v-if="errors.status_id"
								>
									<strong>{{ errors.status_id[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<button type="submit" class="btn btn-success mr-2">
								<i class="fa fa-floppy-o" aria-hidden="true"></i> Submit
							</button>
							<button
								type="button"
								class="btn btn-danger"
								@click.prevent="changeSaleEditMode(false)"
							>
								<i class="fa fa-ban" aria-hidden="true"></i> Cancel
							</button>
						</div>
					</div>
				</b-form>
			</template>
			<h2 class="page-title underline">Add Items</h2>

			<div class="grid-container">
				<div class="grid-item">
					<h6>Total Amount: {{ total_sale_price }}</h6>
				</div>
				<div class="grid-item">
					<h6>Total Tax: {{ total_tax }}</h6>
				</div>
				<div class="grid-item">
					<h6>Total: {{ total_sale_price + total_tax }}</h6>
					<!-- <h6>Total: {{ typeof total_tax }}</h6> -->
				</div>
			</div>

			<div class="grid-container">
				<b-form @submit.prevent="submitAddItem">
					<div class="grid-item"></div>

					<div class="grid-item"></div>

					<div class="grid-item"></div>

					<div class="grid-item"></div>

					<div class="grid-item"></div>

					<div class="grid-item"></div>
				</b-form>
			</div>

			<b-container class="">
				<b-row>
					<SalesTable
						:records="saleForm.details"
						@itemToDelete="removeItemRecord"
						@itemToUpdate="editItemRecord"
					/>
				</b-row>
			</b-container>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../../../components/Spinner/Spinner.vue';
import Detail from '../../../components/Sales/Details.vue';
import SalesTable from '../../../components/SalesTable/SalesTable.vue';

export default {
	name: 'SaleDetailsPage',
	components: {
		Spinner,
		Detail,
		SalesTable,
	},
	mounted() {
		if (!this.$route.params.id) {
			this.$router.push('/sales');
			return;
		}

		if (this.isAuthenticated) {
			this.fetchTaxDetails();
			this.fetchCustomers();
			this.fetchLocations();
			this.getStatuses();
			this.getSaleDetails(this.$route.params.id).then(() => {
				this.updateValues();
			});
		}
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			isAuthenticated: 'auth/isAuthenticated',
			customers: 'customer/customers',
			pageLoad: 'sales/pageLoad',
			errors: 'sales/errors',
			selectedSale: 'sales/selectedSale',
			statuses: 'sales/statuses',
			fetchInvoiceNo: 'sales/fetchInvoiceNo',
			latestInvoiceNo: 'sales/latestInvoiceNo',
		}),
	},
	data() {
		return {
			editItemMode: false,
			total_sale_price: 0,
			total_cost_price: 0,
			total_avg_price: 0,
			total_tax: 0,
			editSaleForm: false,
			saleForm: {
				sale_invoice_no: '',
				type: 'export',
				customer_id: null,
				contact_no: '',
				shipping_location: '',
				quotation: 0,
				tax: 0,
				details: [],
				status_id: null,
			},
			item: {
				name: '',
				cost_price: null,
				sale_price: null,
				quantity: null,
				inventory_id: null,
				location_id: null,
				quantityInStock: null,
			},
		};
	},
	methods: {
		...mapActions({
			getSaleDetails: 'sales/getSaleDetails',
			fetchCustomers: 'customer/fetchCustomers',
			fetchTaxDetails: 'tax/fetchTaxDetails',
			fetchLocations: 'location/fetchLocations',
			getStatuses: 'sales/getAllSalesStatusFromServer',
			fetchLocationBasedInventory: 'invt/fetchLocationBasedInventory',
			updateSale: 'sales/updateSaleRecordOnServer',
			getLatestInvoiceNumberFromServer:
				'sales/getLatestInvoiceNumberFromServer',
		}),
		updateValues() {
			this.saleForm = {
				...this.selectedSale,
				tax: parseFloat(this.selectedSale.tax_percent),
				quotation_details: this.selectedSale.quotation,
				quotation: this.selectedSale.quotation === 'Yes' ? 1 : 0,
			};
			this.calcTotalSalePriceAndTax();
		},
		changeSaleEditMode(trueOrFalse) {
			this.editSaleForm = trueOrFalse;
		},
		submitAddItem() {
			//
		},
		submitSaleForm() {
			const data = {
				...this.saleForm,
				id: this.$route.params.id,
			};

			this.updateSale(data).then(() => {
				this.changeSaleEditMode(false);
				this.updateValues();
			});
		},
		onCustomerChangeHandler() {
			const customer = this.customers.find(
				customer => customer.id === this.saleForm.customer_id
			);
			this.saleForm.contact_no = customer.mobile_no_country;
			this.saleForm.shipping_location = customer.cargo_address;
		},
		removeItemRecord(index) {
			console.log('Index: ' + index);
		},
		editItemRecord(index) {
			console.log('Index: ' + index);
		},
		onStatusChangeHandler() {
			const condition =
				this.saleForm.status_id !== 0 &&
				this.saleForm.quotation === 1 &&
				!this.saleForm.sale_invoice_no;

			if (condition) {
				this.getLatestInvoiceNumberFromServer().then(() => {
					this.saleForm.sale_invoice_no = this.latestInvoiceNo;
				});
			}
		},
		calcTotalSalePriceAndTax() {
			this.total_sale_price = this.saleForm.details
				.map(d => d.total_price)
				.reduce((prev, next) => prev + next);

			this.total_avg_price = this.saleForm.details
				.map(d => d.total_item_avg_price)
				.reduce((prev, next) => prev + next);

			this.total_tax =
				(parseFloat(this.total_sale_price) * this.saleForm.tax) / 100;
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.grid-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;
}

.grid-item {
	text-align: left;
	padding: 20px 10px;
}

.underline {
	text-decoration: underline;
}
</style>
