<template>
	<div>
		<h1 class="page-title">Purchase Details</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
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

			<div class="grid-container">
				<div class="grid-item"></div>
				<div class="grid-item">
					<h3>Status:</h3>
				</div>
				<div class="grid-item">
					<h4>{{ selectedPurchase ? selectedPurchase.status : '' }}</h4>
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
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ItemsTable from '../../../components/ItemsTable/ItemsTable.vue';
import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'UpdatePurchasePage',
	mounted() {
		if (!this.$route.params.id) {
			this.$router.push('/purchase');
			return;
		}

		if (this.isAuthenticated) {
			this.fetchActiveLocations();
			this.getPurchaseDetails(this.$route.params.id).then(() => {
				this.updateValues();
			});
		}
	},
	components: {
		ItemsTable,
		Spinner,
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
			pageLoad: 'purchase/pageLoad',
			selectedPurchase: 'purchase/selectedPurchase',
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
			getPurchaseDetails: 'purchase/getPurchaseDetails',
			removeItem: 'purchase/removedPurchasedItemRecord',
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
		updateValues() {
			const { local_purchase, total_amount, details } = this.selectedPurchase;

			this.local_purchase = local_purchase;
			this.total_amount = total_amount;
			this.details = details;
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
			const id = this.details[index].id;

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
						this.removeItem(id).then(() => {
							this.$swal.fire(
								'Done!',
								'Purchased item has been removed',
								'success'
							);
							this.resetTotalAmount();
						});
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
		resetTotalAmount() {
			const details = this.selectedPurchase.details;
			if (details.length) {
				this.total_amount = details
					.map(d => d.total_price)
					.reduce((prev, next) => prev + next);
			} else {
				this.total_amount = 0;
			}
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
