<template>
	<div class="sale-detail-page-wrapping-div">
		<h1 class="page-title">Sale Details</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<template v-if="!editSaleForm">
				<Detail :data="saleForm" @changeToEditMode="changeSaleEditMode" :disableEdit="disableEdit" />
			</template>

			<template v-else>
				<b-form @submit.prevent="submitSaleForm">
					<div class="grid-container">
						<div class="grid-item">
							<b-form-group id="input-group-1" label="Sale Invoice No:" label-for="input-1" class="input-form-label">
								<b-form-input
									id="input-1"
									v-model="saleForm.sale_invoice_no"
									placeholder="Sale Invoice No:"
									disabled
								></b-form-input>
								<small v-if="fetchInvoiceNo"> Fetching latest invoice number ... </small>
								<span class="invalid-feedback left-text" v-if="errors.sale_invoice_no">
									<strong>{{ errors.sale_invoice_no[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-1" label="Tax (%):" label-for="input-1" class="input-form-label">
								<b-form-input
									id="input-1"
									v-model="saleForm.tax"
									placeholder="Tax Percent:"
									disabled
									:class="{ 'is-invalid': errors.tax_percent }"
								></b-form-input>
								<span class="invalid-feedback left-text" v-if="errors.tax_percent">
									<strong>{{ errors.tax_percent[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-2" label="Sale Quotation:" label-for="input-2" class="input-form-label">
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.quotation"
									:class="{ 'is-invalid': errors.quotation }"
								>
									<option value="0">False</option>
									<option value="1">True</option>
								</select>
								<span class="invalid-feedback left-text" v-if="errors.quotation">
									<strong>{{ errors.quotation[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-3" label="Type:" label-for="input-3" class="input-form-label">
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.type"
									@change.prevent="onChangeTypeHandler"
									:class="{ 'is-invalid': errors.type }"
									disabled
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
							<b-form-group id="input-group-4" label="Customer:" label-for="input-4" class="input-form-label">
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.customer_id"
									@change.prevent="onCustomerChangeHandler"
									:class="{ 'is-invalid': errors.customer_id }"
								>
									<option selected disabled value="null">Select Customer</option>
									<option
										v-for="customer in customers"
										:key="customer.id"
										:value="customer.id"
										:disabled="customer.status !== 'Active'"
									>
										{{ customer.name }}
									</option>
								</select>
								<span class="invalid-feedback left-text" v-if="errors.customer_id">
									<strong>{{ errors.customer_id[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-5" label="Contact No:" label-for="input-5" class="input-form-label">
								<b-form-input
									id="input-5"
									v-model="saleForm.contact_no"
									placeholder="Contact No:"
									:class="{ 'is-invalid': errors.contact_no }"
								></b-form-input>
								<span class="invalid-feedback left-text" v-if="errors.contact_no">
									<strong>{{ errors.contact_no[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-6" label="Shipping Location:" label-for="input-6" class="input-form-label">
								<b-form-textarea
									id="input-6"
									v-model="saleForm.shipping_location"
									placeholder="Cargo address"
									:class="{ 'is-invalid': errors.shipping_location }"
								></b-form-textarea>
								<span class="invalid-feedback left-text" v-if="errors.shipping_location">
									<strong>{{ errors.shipping_location[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-7" label="Extra Charges:" label-for="input-7" class="input-form-label">
								<b-form-input
									id="input-7"
									v-model="saleForm.extra_charges"
									placeholder="Extra Charges:"
									:class="{ 'is-invalid': errors.extra_charges }"
								></b-form-input>
								<span class="invalid-feedback left-text" v-if="errors.extra_charges">
									<strong>{{ errors.extra_charges[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<b-form-group id="input-group-9" label="Status:" label-for="input-9" class="input-form-label">
								<select
									class="form-control"
									id="changeItem"
									v-model="saleForm.status_id"
									:class="{ 'is-invalid': errors.status_id }"
									@change="onStatusChangeHandler"
								>
									<option selected disabled value="null">Select Status</option>
									<option v-for="status in statuses" :key="status.id" :value="status.id">
										{{ status.name }}
									</option>
								</select>
								<span class="invalid-feedback left-text" v-if="errors.status_id">
									<strong>{{ errors.status_id[0] }}</strong>
								</span>
							</b-form-group>
						</div>

						<div class="grid-item">
							<button type="submit" class="btn btn-success mr-2">
								<i class="fa fa-floppy-o" aria-hidden="true"></i> Submit
							</button>
							<button type="button" class="btn btn-danger" @click.prevent="changeSaleEditMode(false)">
								<i class="fa fa-ban" aria-hidden="true"></i> Cancel
							</button>
						</div>
					</div>
				</b-form>
			</template>
			<h2 class="page-title underline mt-10">Add Items</h2>

			<div class="grid-container">
				<div class="grid-item">
					<h6>Total Amount: {{ total_sale_price }}</h6>
				</div>
				<div class="grid-item">
					<h6>Total Tax: {{ total_tax }}</h6>
				</div>
				<div class="grid-item">
					<h6>Total: {{ total_sale_price + total_tax }}</h6>
				</div>
			</div>

			<div class="grid-container">
				<div class="grid-item">
					<b-form-group id="input-group-11" label="Location:" label-for="input-11" class="input-form-label">
						<select
							class="form-control"
							id="changeItem"
							v-model="item.location_id"
							@change.prevent="onChangeLocationHandler"
							:class="{ 'is-invalid': errors.type }"
						>
							<option selected disabled value="null">Select Location</option>
							<option
								v-for="location in locations"
								:key="location.id"
								:value="location.id"
								:disabled="editItemMode || location.status !== 'Active'"
							>
								{{ location.name }}
							</option>
						</select>
						<span class="invalid-feedback left-text" v-if="errors.type">
							<strong>{{ errors.type[0] }}</strong>
						</span>
					</b-form-group>
				</div>

				<div class="grid-item">
					<b-form-group id="input-group-12" label="Inventory:" label-for="input-12" class="input-form-label">
						<template v-if="editItemMode">
							<b-form-input id="input-12" :value="item.name" disabled></b-form-input>
						</template>
						<template v-else>
							<select
								class="form-control"
								id="changeItem"
								v-model="item.inventory_id"
								@change="onInventoryChangeHandler"
								:class="{ 'is-invalid': errors.type }"
							>
								<option selected disabled value="null">Select Inventory</option>
								<option
									v-for="invt in inventories"
									:key="invt.id"
									:value="invt.id"
									:disabled="!item.location_id || invt.status !== 'Active'"
								>
									{{ invt.item_name }}
								</option>
							</select>
						</template>
						<span class="invalid-feedback left-text" v-if="errors.type">
							<strong>{{ errors.type[0] }}</strong>
						</span>
					</b-form-group>
				</div>

				<div class="grid-item"></div>

				<div class="grid-item">
					<b-form-group id="input-group-14" label="Sale Price:" label-for="input-14" class="input-form-label">
						<b-form-input
							id="input-14"
							type="number"
							v-model="item.sale_price"
							placeholder="Sale Price:"
							:disabled="!item.inventory_id"
						></b-form-input>
						<small v-if="item.cost_price">
							<strong>Cost price: {{ item.cost_price }}</strong>
						</small>
						<span class="sale-alert left-text" v-if="lowSalePrice">
							<strong>Sale Price must be greater than cost price</strong>
						</span>
					</b-form-group>
				</div>

				<div class="grid-item">
					<b-form-group id="input-group-15" label="Quantity:" label-for="input-15" class="input-form-label">
						<b-form-input
							id="input-15"
							type="number"
							v-model="item.quantity"
							placeholder="Quantity:"
							:disabled="!item.sale_price"
						></b-form-input>
						<small v-if="item.quantityInStock">
							<strong>Quantity in stock: {{ item.quantityInStock }}</strong>
						</small>
					</b-form-group>
				</div>

				<div class="grid-item"></div>

				<div class="grid-item">
					<b-button
						type="submit"
						variant="success"
						class="admin-add-user-add-button"
						:disabled="!item.quantity"
						@click.prevent="onAddItemDetailsHandler"
					>
						<i class="fa fa-floppy-o" aria-hidden="true"></i> Add
					</b-button>
					<span class="alert-span" v-if="similarItemSelected">
						<strong>Note:</strong> Adding same item again will overwrite the previous record.</span
					>
				</div>

				<div class="grid-item"></div>
				<div class="grid-item"></div>
				<div class="grid-item" v-if="savingOnServer">
					<small>Data moving to server...</small>
				</div>
			</div>

			<b-container class="">
				<template v-if="!savingOnServer">
					<b-row>
						<SalesTable
							:records="saleDetails"
							:disableEdit="disableEdit"
							@itemToDelete="removeItemRecord"
							@itemToUpdate="editItemRecord"
						/>
					</b-row>
				</template>

				<template v-else>
					<b-skeleton-table :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
				</template>
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
			locations: 'location/locations',
			inventories: 'invt/inventories',
			savingOnServer: 'sales/savingOnServer',
		}),
		lowSalePrice() {
			const condition = this.item.sale_price && parseFloat(this.item.sale_price) < parseFloat(this.item.cost_price);
			return condition ? true : false;
		},
		similarItemSelected() {
			const index = this.saleForm.details.findIndex(
				detail => detail.location_id === this.item.location_id && detail.inventory_id === this.item.inventory_id
			);
			return this.item.inventory_id && !this.editItemMode && index > -1 ? true : false;
		},
		saleDetails() {
			return this.$store.state.sales.selectedSale ? this.$store.state.sales.selectedSale.details : [];
		},
		statusMessage() {
			const message = "Once status is delivered or cancelled, you can't be able to change it in future";
			return this.saleForm.status_id > 3 ? message : '';
		},
		disableEdit() {
			// if status is deleivered or cancelled
			return this.saleForm.status_id > 3 ? true : false;
		},
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
			getInvoiceNumberFromServer: 'sales/getInvoiceNumberFromServer',
			updateSaleDetail: 'sales/updateSaleDetailItemOnServer',
			addSaleDetail: 'sales/addNewSaleDetailItemOnServer',
			removeItem: 'sales/removeSaleDetailItemOnServer',
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
			this.saleForm.status_id = this.editSaleForm ? this.selectedSale.status_id : null;

			const condition = this.editSaleForm || (!this.editSaleForm && this.selectedSale.sale_invoice_no);

			this.saleForm.sale_invoice_no = condition ? this.selectedSale.sale_invoice_no : null;
		},
		submitAddItem() {
			//
		},

		submitSaleForm() {
			const data = {
				...this.saleForm,
				id: this.$route.params.id,
				tax_percent: this.saleForm.tax,
			};

			this.updateSale(data).then(() => {
				this.changeSaleEditMode(false);
				this.updateValues();
			});
		},
		onChangeLocationHandler() {
			this.item.inventory_id = null;
			this.fetchLocationBasedInventory(this.item.location_id);
		},
		onCustomerChangeHandler() {
			const customer = this.customers.find(customer => customer.id === this.saleForm.customer_id);
			this.saleForm.contact_no = customer.mobile_no_country;
			this.saleForm.shipping_location = customer.cargo_address;
		},
		onInventoryChangeHandler() {
			const invt = this.inventories.find(invt => invt.id === this.item.inventory_id);
			this.item.name = invt.item_name;
			this.item.cost_price = invt.sale_price;
			this.item.avg_price = invt.avg_price;
			this.item.quantityInStock = invt.quantity;
		},
		removeItemRecord(index) {
			const id = this.saleForm.details[index].id;

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
						if (id) {
							this.removeItem(id).then(() => {
								this.$swal.fire('Done!', 'Purchased item has been removed', 'success');
								this.calcTotalSalePriceAndTax();
							});
						} else {
							this.saleForm.details.splice(index, 1);
							this.calcTotalSalePriceAndTax();
							this.$swal.fire('Done!', 'Record has been removed', 'success');
						}
					}
				});
		},
		editItemRecord(index) {
			const data = this.saleForm.details[index];

			this.editItemMode = true;
			this.item = { ...data, id: data.id };
		},
		onAddItemDetailsHandler() {
			this.editItemMode = false;
			const index = this.saleForm.details.findIndex(
				i => i.location_id === this.item.location_id && i.inventory_id === this.item.inventory_id
			);

			if (index > -1) {
				const data = {
					id: this.saleForm.details[index].id,
					tax: this.saleForm.tax,
					sale_price: this.item.sale_price,
					avg_price: this.item.avg_price,
					quantity: this.item.quantity,
				};

				this.updateSaleDetail(data).then(() => {
					this.resetItemDetails();
					this.calcTotalSalePriceAndTax();
				});
			} else {
				const data = {
					tax: this.saleForm.tax,
					sale_id: this.$route.params.id,
					cost_price: this.item.cost_price,
					avg_price: this.item.avg_price,
					sale_price: this.item.sale_price,
					quantity: this.item.quantity,
					inventory_id: this.item.inventory_id,
					location_id: this.item.location_id,
					quantityInStock: this.item.quantityInStock,
					name: this.getItem(),
					location: this.getLocation(),
					total_item_cost_price: this.item.cost_price * this.item.quantity,
					total_item_avg_price: this.item.avg_price * this.item.quantity,
					total_price: this.item.sale_price * this.item.quantity,
				};

				this.addSaleDetail(data).then(() => {
					this.resetItemDetails();
					this.calcTotalSalePriceAndTax();
				});
			}
		},
		resetItemDetails() {
			this.item.cost_price = null;
			this.item.avg_price = null;
			this.item.sale_price = null;
			this.item.quantity = null;
			this.item.quantityInStock = null;
			this.item.location_id = null;
			this.item.inventory_id = null;
		},
		onStatusChangeHandler() {
			const condition =
				this.saleForm.status_id !== 0 && this.saleForm.quotation === 1 && !this.saleForm.sale_invoice_no;

			if (condition) {
				this.getInvoiceNumberFromServer(this.$route.params.id).then(() => {
					this.saleForm.sale_invoice_no = this.latestInvoiceNo;
				});
			}
		},
		onChangeTypeHandler() {
			this.saleForm.tax = this.saleForm.type === 'export' ? 0 : parseFloat(this.selectedSale.tax_percent);

			const condition = this.saleForm.type === 'export' && !this.saleForm.sale_invoice_no;
			if (condition) {
				this.getInvoiceNumberFromServer(this.$route.params.id).then(() => {
					this.saleForm.sale_invoice_no = this.latestInvoiceNo;
				});
			}
		},
		calcTotalSalePriceAndTax() {
			if (this.saleForm.details.length) {
				this.total_sale_price = this.saleForm.details.map(d => d.total_price).reduce((prev, next) => prev + next);

				this.total_avg_price = this.saleForm.details
					.map(d => d.total_item_avg_price)
					.reduce((prev, next) => prev + next);

				this.total_tax = (parseFloat(this.total_sale_price) * this.saleForm.tax) / 100;
			}
		},
		getItem() {
			if (!this.inventories) {
				return '';
			}
			const invt = this.inventories.find(invt => invt.id === this.item.inventory_id);
			return invt.item_name;
		},
		getLocation() {
			if (!this.locations) {
				return '';
			}
			const location = this.locations.find(l => l.id === this.item.location_id);
			return location.name;
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

.sale-detail-page-wrapping-div {
	padding-bottom: 100px;
}

.statusMessage {
	color: red;
}
</style>
