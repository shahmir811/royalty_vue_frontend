<template>
	<div>
		<h1 class="page-title">
			Update Inventory <span v-if="form">{{ form.location_id }}</span>
		</h1>

		<b-row align-h="center" v-if="form">
			<b-col cols="8">
				<b-form @submit.prevent="submitForm">
					<b-form-group
						id="input-group-1"
						label="Item Name:"
						label-for="input-1"
						class="input-form-label"
					>
						<b-form-input
							id="input-1"
							v-model="form.item_name"
							placeholder="Enter item name"
							:class="{ 'is-invalid': errors.item_name }"
							disabled
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.item_name">
							<strong>{{ errors.item_name[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group
						id="input-group-2"
						label="Store Location:"
						label-for="input-2"
						class="input-form-label"
					>
						<b-form-input
							id="input-2"
							v-model="form.location"
							placeholder="Enter item name"
							:class="{ 'is-invalid': errors.item_name }"
							disabled
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.item_name">
							<strong>{{ errors.item_name[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group
						id="input-group-2"
						label="Quantity:"
						label-for="input-2"
						class="input-form-label"
					>
						<b-form-input
							id="input-2"
							v-model="form.quantity"
							type="number"
							placeholder="Enter quantity"
							:class="{ 'is-invalid': errors.quantity }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.quantity">
							<strong>{{ errors.quantity[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group
						id="input-group-5"
						label="Purchase price:"
						label-for="input-5"
						class="input-form-label"
					>
						<b-form-input
							id="input-5"
							v-model="form.purchase_price"
							type="number"
							step="any"
							placeholder="Purchase price"
							:class="{ 'is-invalid': errors.purchase_price }"
						></b-form-input>
						<span
							class="invalid-feedback left-text"
							v-if="errors.purchase_price"
						>
							<strong>{{ errors.purchase_price[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group
						id="input-group-6"
						label="Sale price:"
						label-for="input-6"
						class="input-form-label"
					>
						<b-form-input
							id="input-6"
							v-model="form.sale_price"
							type="number"
							step="any"
							placeholder="Sale price"
							:class="{ 'is-invalid': errors.sale_price }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.sale_price">
							<strong>{{ errors.sale_price[0] }}</strong>
						</span>
						<span v-if="lowSalePrice" class="red-text">
							Sale price is lower than purchase price
						</span>
					</b-form-group>

					<b-form-group
						id="input-group-7"
						label="Average price:"
						label-for="input-7"
						class="input-form-label"
					>
						<b-form-input
							id="input-7"
							v-model="form.avg_price"
							type="number"
							step="any"
							placeholder="Average price"
							:class="{ 'is-invalid': errors.avg_price }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.avg_price">
							<strong>{{ errors.avg_price[0] }}</strong>
						</span>
					</b-form-group>

					<div class="add-user-btn-group">
						<b-button
							type="submit"
							variant="success"
							class="admin-add-user-add-button"
							:disabled="loading"
						>
							<template v-if="loading"
								><b-spinner small label="Small Spinner"></b-spinner
							></template>
							<template v-else
								><i class="fa fa-floppy-o" aria-hidden="true"></i>
								Update</template
							>
						</b-button>
						<router-link
							to="/inventory"
							class="btn btn-danger admin-add-user-cancel-button"
							><i class="fa fa-times" aria-hidden="true"></i>
							Cancel</router-link
						>
					</div>
				</b-form>
			</b-col>
		</b-row>

		<b-row v-else>
			<div class="text-center">
				<Spinner />
			</div>
		</b-row>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'UpdateInventoryPage',
	computed: {
		...mapGetters({
			items: 'items/items',
			locations: 'location/locations',
			inventories: 'invt/inventories',
			updateInventory: 'invt/updateInventory',
			errors: 'invt/errors',
			loading: 'invt/loading',
		}),
		lowSalePrice() {
			const condition = this.form.sale_price < this.form.purchase_price;
			return condition ? true : false;
		},
	},
	mounted() {
		this.clearValidationErrors();
		this.fetchLocations();
		this.fetchAllItems();
		if (this.inventories.length > 0) {
			this.selectInventoryToUpdate(this.$route.params.id);
			this.form = { ...this.updateInventory };
		} else {
			this.fetchIventoryItems().then(() => {
				this.selectInventoryToUpdate(this.$route.params.id);
				this.form = { ...this.updateInventory };
			});
		}
	},
	components: {
		Spinner,
	},
	data() {
		return {
			form: this.updateInventory,
		};
	},
	methods: {
		...mapActions({
			fetchAllItems: 'items/fetchAllItems',
			fetchLocations: 'location/fetchLocations',
			clearValidationErrors: 'invt/clearValidationErrors',
			fetchIventoryItems: 'invt/fetchInventoryItemsFromUpdateInventoryItemPage',
			selectInventoryToUpdate: 'invt/selectInventoryToUpdate',
			updateInventoryItemDetails: 'invt/updateInventoryItemDetails',
		}),
		submitForm() {
			this.updateInventoryItemDetails(this.form);
		},
		onChangeHandler(event) {
			this.form.location_id = event.target.value;
		},
		onChangeItemHandler(event) {
			this.form.item_id = event.target.value;
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
