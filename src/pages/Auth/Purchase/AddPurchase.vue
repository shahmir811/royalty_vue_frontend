<template>
	<div>
		<h1 class="page-title">New Purchase</h1>
		<p>Details: {{ details.length }} Inventory Id: {{ inventory_id }}</p>

		<b-row class="justify-content-md-center">
			<b-col col cols="12" md="auto">
				<h3>Local Purchase:</h3>
			</b-col>
			<b-col col lg="2">
				<b-form-checkbox
					size="lg"
					value="1"
					v-model="local_purchase"
				></b-form-checkbox>
			</b-col>
			<b-col col lg="2"></b-col>
		</b-row>

		<b-row class="justify-content-md-center">
			<b-col col cols="12" md="auto" class="pl-0">
				<h3>Total Amount:</h3>
			</b-col>
			<b-col col lg="2" class="pl-40">
				<h4>{{ total_amount }}</h4>
			</b-col>
			<b-col col lg="2"></b-col>
		</b-row>

		<b-row class="ml-1">
			<b-button
				variant="success"
				@click.prevent="savePurchase"
				:disabled="loading"
			>
				<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
			</b-button>
			<b-button
				variant="danger"
				class="ml-2"
				@click.prevent="goBack"
				:disabled="loading"
			>
				<i class="fa fa-times" aria-hidden="true"></i> Cancel
			</b-button>
		</b-row>

		<hr />

		<b-form @submit.prevent="submitForm">
			<b-row>
				<b-col>
					<div>
						<label for="Location">Location</label>
						<select
							class="custom-select"
							@change="onLocationChangeHandler"
							v-model="location_id"
						>
							<option selected disabled value="null">Select Location</option>
							<option
								v-for="location in locations"
								:key="location.id"
								:value="location.id"
								:disabled="editMode"
							>
								{{ location.name }}
							</option>
						</select>
					</div>
				</b-col>
				<b-col>
					<label for="Item">Item</label>
					<select class="custom-select" v-model="inventory_id">
						<option selected disabled value="null">Select Item</option>
						<option
							v-for="item in inventories"
							:key="item.id"
							:value="item.id"
							:disabled="editMode"
						>
							{{ item.item_name }}
						</option>
					</select>
				</b-col>
				<b-col>
					<div class="form-group">
						<label for="price">Price:</label>
						<input
							type="number"
							class="form-control"
							id="price"
							:disabled="!inventory_id"
							v-model="price"
						/>
					</div>
				</b-col>
				<b-col>
					<div class="form-group">
						<label for="quantity">Quantity:</label>
						<input
							type="number"
							class="form-control"
							id="quantity"
							:disabled="!price"
							v-model="quantity"
						/>
					</div>
				</b-col>
			</b-row>
			<b-row class="ml-1">
				<b-button
					type="submit"
					variant="success"
					class="admin-add-user-add-button"
					:disabled="!price || !quantity"
				>
					<i class="fa fa-floppy-o" aria-hidden="true"></i> Add
				</b-button>
				<span class="alert-span" v-if="similarItemSelected">
					<strong>Note:</strong> Adding same item again will overwrite the
					previous record.</span
				>
			</b-row>
		</b-form>

		<hr />

		<b-container class="">
			<b-row>
				<ItemsTable
					:records="details"
					@itemToDelete="removeRecord"
					@itemToUpdate="editRecord"
				/>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ItemsTable from '../../../components/ItemsTable/ItemsTable.vue';

export default {
	name: 'AddPurchasePage',
	mounted() {
		if (this.isAuthenticated) {
			this.fetchActiveLocations();
		}
	},
	components: {
		ItemsTable,
	},
	data() {
		return {
			local_purchase: 1,
			total_amount: 0,
			location_id: null,
			location: '',
			inventory_id: null,
			inventory: '',
			price: '',
			quantity: '',
			details: [],
			editMode: false,
			selectedRecord: null,
		};
	},
	computed: {
		...mapGetters({
			locations: 'location/activeLocations',
			inventories: 'invt/inventories',
			fetchingInvt: 'invt/loading',
			loading: 'purchase/loading',
			isAuthenticated: 'auth/isAuthenticated',
		}),
		similarItemSelected() {
			const index = this.details.findIndex(
				detail => detail.inventory_id === this.inventory_id
			);
			return this.inventory_id && !this.editMode && index > -1 ? true : false;
		},
	},
	methods: {
		...mapActions({
			fetchActiveLocations: 'location/fetchActiveLocations',
			getItemsList: 'invt/fetchLocationBasedInventory',
			addNewPurchase: 'purchase/addNewPurchase',
		}),
		goBack() {
			this.$router.push('/purchase');
		},
		onLocationChangeHandler(e) {
			this.inventory_id = null;
			this.price = '';
			const locationId = e.target.value;

			const selectedLocation = this.locations.find(
				location => location.id === parseInt(locationId)
			);
			this.location = selectedLocation ? selectedLocation.name : '';
			this.getItemsList(locationId);
		},
		submitForm() {
			this.editMode = false;
			const amount = this.price * this.quantity;
			const selectedItem = this.inventories.find(
				item => item.id === this.inventory_id
			);
			this.inventory = selectedItem ? selectedItem.item_name : '';

			const index = this.details.findIndex(
				i => i.inventory_id === this.inventory_id
			);

			if (index > -1) {
				this.details[index].price = this.price;
				this.details[index].quantity = this.quantity;
				this.details[index].total_price = this.price * this.quantity;
			} else {
				this.details.push({
					location_id: this.location_id,
					location: this.location,
					inventory_id: this.inventory_id,
					inventory: this.inventory,
					price: this.price,
					quantity: this.quantity,
					total_price: amount,
				});
			}

			this.total_amount = this.details
				.map(d => d.total_price)
				.reduce((prev, next) => prev + next);
			this.resetForm();
		},
		resetForm() {
			this.location = '';
			this.location_id = null;
			this.inventory = '';
			this.inventory_id = null;
			this.price = '';
			this.quantity = '';
		},
		recordAlreadyExists(id) {
			const index = this.details.findIndex(i => i.inventory_id === id);
			return index > -1 ? true : false; // returns -1 if record not found
		},
		removeRecord(index) {
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
						this.total_amount =
							this.total_amount - this.details[index].total_price;
						this.details.splice(index, 1);
						this.$swal.fire('Done!', 'Record has been removed', 'success');
					}
				});
		},
		editRecord(index) {
			this.editMode = true;
			this.selectedRecord = this.details[index];
			this.location_id = this.selectedRecord.location_id;
			this.inventory_id = this.selectedRecord.inventory_id;
			this.price = this.selectedRecord.price;
			this.quantity = this.selectedRecord.quantity;
		},
		savePurchase() {
			if (this.details.length > 0) {
				const data = {
					local_purchase: this.local_purchase,
					total_amount: this.total_amount,
					details: this.details,
				};

				this.addNewPurchase(data);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../../styles/styles.scss';

.alert-span {
	padding-top: 10px;
	color: red;
}
</style>
