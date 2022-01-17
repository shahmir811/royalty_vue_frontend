<template>
	<div class="add-sale-page-wrapping-div">
		<h1 class="page-title">Add New Sale</h1>

		<b-form @submit.prevent="submitForm">
			<div class="grid-container">
				<div class="grid-item">
					<b-form-group
						id="input-group-1"
						label="Tax (%):"
						label-for="input-1"
						class="input-form-label"
					>
						<b-form-input
							id="input-1"
							v-model="form.tax"
							placeholder="Tax Percent:"
							:disabled="role !== 'admin' || form.type === 'export'"
							@change="calcTotalSalePriceAndTax"
							:class="{ 'is-invalid': errors.tax_percent }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.tax_percent">
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
							v-model="form.quotation"
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
					<b-form-group
						id="input-group-3"
						label="Type:"
						label-for="input-3"
						class="input-form-label"
					>
						<select
							class="form-control"
							id="changeItem"
							v-model="form.type"
							@change="onChangeSaleType"
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
							v-model="form.customer_id"
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
					<b-form-group
						id="input-group-5"
						label="Contact No:"
						label-for="input-5"
						class="input-form-label"
					>
						<b-form-input
							id="input-5"
							v-model="form.contact_no"
							placeholder="Contact No:"
							:class="{ 'is-invalid': errors.contact_no }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.contact_no">
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
							v-model="form.shipping_location"
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
							type="number"
							v-model="form.extra_charges"
							placeholder="Extra charges"
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

				<div class="grid-item"></div>
				<div class="grid-item"></div>

				<div class="grid-item">
					<button type="submit" class="btn btn-success mr-2">
						<i class="fa fa-floppy-o" aria-hidden="true"></i> Submit
					</button>
					<button
						type="button"
						class="btn btn-danger"
						@click.prevent="gotoSales"
					>
						<i class="fa fa-ban" aria-hidden="true"></i> Cancel
					</button>
				</div>
			</div>
		</b-form>

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
			</div>

			<div class="grid-item">
				<b-form-group
					id="input-group-11"
					label="Location:"
					label-for="input-11"
					class="input-form-label"
				>
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
				<b-form-group
					id="input-group-12"
					label="Inventory:"
					label-for="input-12"
					class="input-form-label"
				>
					<template v-if="editItemMode">
						<b-form-input
							id="input-12"
							:value="item.name"
							disabled
						></b-form-input>
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
				<b-form-group
					id="input-group-14"
					label="Sale Price:"
					label-for="input-14"
					class="input-form-label"
				>
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
				<b-form-group
					id="input-group-15"
					label="Quantity:"
					label-for="input-15"
					class="input-form-label"
				>
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
					<strong>Note:</strong> Adding same item again will overwrite the
					previous record.</span
				>
			</div>
		</div>

		<b-container class="">
			<b-row>
				<SalesTable
					:records="form.details"
					@itemToDelete="removeItemRecord"
					@itemToUpdate="editItemRecord"
				/>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SalesTable from '../../../components/SalesTable/SalesTable.vue';

export default {
	name: 'AddSalePage',
	mounted() {
		this.fetchTaxDetails().then(() => {
			this.form.tax = this.taxPercent;
		});
		this.fetchCustomers();
		this.fetchLocations();
	},
	components: {
		SalesTable,
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			customers: 'customer/customers',
			showTax: 'tax/showTax',
			taxPercent: 'tax/taxPercent',
			errors: 'sales/errors',
			locations: 'location/locations',
			inventories: 'invt/inventories',
		}),
		lowSalePrice() {
			const condition =
				this.item.sale_price &&
				parseFloat(this.item.sale_price) < parseFloat(this.item.cost_price);
			return condition ? true : false;
		},
		similarItemSelected() {
			const index = this.form.details.findIndex(
				detail =>
					detail.location_id === this.item.location_id &&
					detail.inventory_id === this.item.inventory_id
			);
			return this.item.inventory_id && !this.editItemMode && index > -1
				? true
				: false;
		},
	},
	data() {
		return {
			editItemMode: false,
			total_sale_price: 0,
			total_avg_price: 0,
			total_tax: 0,
			form: {
				type: 'local',
				customer_id: null,
				contact_no: '',
				shipping_location: '',
				quotation: 0,
				extra_charges: '',
				// tax: this.taxPercent ? this.taxPercent : 0,
				tax: 0,
				details: [],
			},
			item: {
				name: '',
				cost_price: null,
				avg_price: null,
				sale_price: null,
				quantity: null,
				inventory_id: null,
				location_id: null,
				quantityInStock: null,
			},
		};
	},
	watch: {
		taxPercent(newValue) {
			this.form.tax = newValue;
		},
	},
	methods: {
		...mapActions({
			fetchCustomers: 'customer/fetchCustomers',
			fetchTaxDetails: 'tax/getTaxFromUpdateTaxPage',
			addNewSaleData: 'sales/addNewSaleData',
			fetchLocations: 'location/fetchLocations',
			fetchLocationBasedInventory: 'invt/fetchLocationBasedInventory',
		}),
		onCustomerChangeHandler() {
			const customer = this.customers.find(
				customer => customer.id === this.form.customer_id
			);
			this.form.contact_no = customer.mobile_no_country;
			this.form.shipping_location = customer.cargo_address;
		},
		submitForm() {
			const record = {
				...this.form,
				total_avg_price: this.total_avg_price,
				total_sale_price: this.total_sale_price,
				total_tax: this.total_tax,
				tax_percent: parseFloat(this.form.tax),
			};
			this.addNewSaleData(record);
		},
		onChangeLocationHandler() {
			this.item.inventory_id = null;
			this.fetchLocationBasedInventory(this.item.location_id);
		},
		onInventoryChangeHandler() {
			const invt = this.inventories.find(
				invt => invt.id === this.item.inventory_id
			);
			this.item.name = invt.item_name;
			this.item.cost_price = invt.sale_price;
			this.item.avg_price = invt.avg_price;
			this.item.quantityInStock = invt.quantity;
		},
		onAddItemDetailsHandler() {
			this.editItemMode = false;
			const index = this.form.details.findIndex(
				i =>
					i.location_id === this.item.location_id &&
					i.inventory_id === this.item.inventory_id
			);

			if (index > -1) {
				this.form.details[index].sale_price = this.item.sale_price;
				this.form.details[index].quantity = this.item.quantity;
				this.form.details[index].total_price =
					this.item.sale_price * this.item.quantity;
			} else {
				const data = {
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
				this.form.details.push(data);
			}

			this.resetItemDetails();
			this.calcTotalSalePriceAndTax();
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
		getItem() {
			if (!this.inventories) {
				return '';
			}
			const invt = this.inventories.find(
				invt => invt.id === this.item.inventory_id
			);
			return invt.item_name;
		},
		getLocation() {
			if (!this.locations) {
				return '';
			}
			const location = this.locations.find(l => l.id === this.item.location_id);
			return location.name;
		},
		removeItemRecord(index) {
			this.$swal
				.fire({
					title: 'Are you sure to remove this?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						// this.total_amount =
						// this.total_amount - this.form.details[index].total_price;
						this.form.details.splice(index, 1);
						this.$swal.fire('Done!', 'Record has been removed', 'success');
						this.calcTotalSalePriceAndTax();
					}
				});
		},
		editItemRecord(index) {
			this.editItemMode = true;
			const detail = this.form.details[index];

			this.item = { ...detail };
		},
		gotoSales() {
			this.$router.push('/sales');
		},
		onChangeSaleType() {
			if (this.form.type === 'export') {
				this.form.tax = 0;
			} else {
				this.form.tax = this.taxPercent;
			}
		},
		calcTotalSalePriceAndTax() {
			this.total_sale_price = this.form.details
				.map(d => d.total_price)
				.reduce((prev, next) => prev + next);

			this.total_avg_price = this.form.details
				.map(d => d.total_item_avg_price)
				.reduce((prev, next) => prev + next);

			this.total_tax = (this.total_sale_price * this.form.tax) / 100;
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

.add-sale-page-wrapping-div {
	padding-bottom: 100px;
}

.alert-span {
	display: block;
	padding-top: 10px;
	color: red;
}
</style>
