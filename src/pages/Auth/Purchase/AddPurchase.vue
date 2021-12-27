<template>
	<div>
		<h1 class="page-title">New Purchase</h1>

		<div class="grid-container">
			<div class="grid-item"></div>
			<div class="grid-item">
				<h3>Local Purchase:</h3>
			</div>
			<div class="grid-item">
				<b-form-checkbox
					size="lg"
					value="1"
					v-model="local_purchase"
				></b-form-checkbox>
			</div>
			<div class="grid-item"></div>
		</div>

		<div class="grid-container">
			<div class="grid-item"></div>
			<div class="grid-item">
				<h3>Total Amount:</h3>
			</div>
			<div class="grid-item">
				<h4>{{ parseFloat(total_amount).toFixed(2) }}</h4>
			</div>
			<div class="grid-item"></div>
		</div>

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
					<select
						class="custom-select"
						@change="onItemChangeHandler"
						v-model="item_id"
					>
						<option selected disabled value="null">Select Item</option>
						<option
							v-for="item in items"
							:key="item.id"
							:value="item.id"
							:disabled="editMode || !location_id"
						>
							{{ item.name }}
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
							:disabled="!item_id"
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
			this.fetchAllItems();
			this.fetchActiveLocations();
		}
	},
	components: {
		ItemsTable,
	},
	data() {
		return {
			item_id: null,
			item: '',
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
			items: 'items/items',
			locations: 'location/activeLocations',
			inventories: 'invt/inventories',
			fetchingInvt: 'invt/loading',
			loading: 'purchase/loading',
			isAuthenticated: 'auth/isAuthenticated',
		}),
		similarItemSelected() {
			const index = this.details.findIndex(
				detail =>
					detail.location_id === this.location_id &&
					detail.item_id === this.item_id
			);
			return this.item_id && !this.editMode && index > -1 ? true : false;
		},
	},
	methods: {
		...mapActions({
			fetchAllItems: 'items/fetchAllItems',
			fetchActiveLocations: 'location/fetchActiveLocations',
			getItemsList: 'invt/fetchLocationBasedInventory',
			addNewPurchase: 'purchase/addNewPurchase',
		}),
		goBack() {
			this.$router.push('/purchase');
		},
		onLocationChangeHandler(e) {
			// this.inventory_id = null;
			this.price = '';
			const locationId = e.target.value;
			const selectedLocation = this.locations.find(
				location => location.id === parseInt(locationId)
			);
			this.location = selectedLocation ? selectedLocation.name : '';
			// this.getItemsList(locationId);
		},
		onItemChangeHandler(e) {
			const itemId = e.target.value;
			const selectedItem = this.items.find(
				item => item.id === parseInt(itemId)
			);
			this.item = selectedItem ? selectedItem.name : '';
		},
		submitForm() {
			console.log('Submit Form');
			this.editMode = false;
			const amount = this.price * this.quantity;
			// const selectedItem = this.inventories.find(
			// 	item => item.id === this.inventory_id
			// );
			// this.inventory = selectedItem ? selectedItem.item_name : '';

			const index = this.details.findIndex(
				i => i.location_id === this.location_id && i.item_id === this.item_id
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
					item_id: this.item_id,
					item: this.item,
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
			this.item = '';
			this.item_id = null;
			this.price = '';
			this.quantity = '';
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
			// this.inventory_id = this.selectedRecord.inventory_id;
			this.item_id = this.selectedRecord.item_id;
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

.grid-container {
	display: grid;
	grid-template-columns: 300px 500px 200px 100px;
	grid-gap: 10px;
}

.grid-item {
	text-align: left;
	padding: 20px 0;
}
</style>
