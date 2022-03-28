<template>
	<div>
		<h1 class="page-title">Update Item</h1>

		<b-row align-h="center" v-if="form">
			<b-col cols="8">
				<b-form @submit.prevent="submitForm">
					<b-form-group id="input-group-1" label="Name:" label-for="input-1" class="input-form-label">
						<b-form-input
							id="input-1"
							v-model="form.name"
							placeholder="Enter name"
							:class="{ 'is-invalid': errors.name }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.name">
							<strong>{{ errors.name[0] }}</strong>
						</span>
					</b-form-group>

					<div class="form-group input-form-label text-left">
						<label for="changeCategory">Category:</label>
						<select
							class="form-control"
							id="changeCategory"
							v-model="form.category_id"
							:class="{ 'is-invalid': errors.category_id }"
						>
							<option value="" selected disabled>Select Category</option>
							<option v-for="cat in categories" :key="cat.id" :value="cat.id">
								{{ cat.name }}
							</option>
						</select>
						<span class="invalid-feedback left-text" v-if="errors.category_id">
							<strong>{{ errors.category_id[0] }}</strong>
						</span>
					</div>

					<b-form-group id="input-group-2" label="CBM:" label-for="input-2" class="input-form-label">
						<b-form-input
							id="input-2"
							v-model="form.cbm"
							step="any"
							type="number"
							placeholder="Enter CBM"
							:class="{ 'is-invalid': errors.cbm }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.cbm">
							<strong>{{ errors.cbm[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group id="input-group-3" label="Weight:" label-for="input-3" class="input-form-label">
						<b-form-input
							id="input-3"
							v-model="form.weight"
							type="number"
							step="any"
							placeholder="Enter weight"
							:class="{ 'is-invalid': errors.weight }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.weight">
							<strong>{{ errors.weight[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group id="input-group-4" label="Package:" label-for="input-4" class="input-form-label">
						<b-form-input
							id="input-4"
							v-model="form.package"
							type="number"
							placeholder="Enter package"
							:class="{ 'is-invalid': errors.package }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.package">
							<strong>{{ errors.package[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group id="input-group-5" label="Description:" label-for="input-5" class="input-form-label">
						<b-form-textarea
							id="input-5"
							v-model="form.description"
							placeholder="Description"
							:class="{ 'is-invalid': errors.description }"
						></b-form-textarea>
						<span class="invalid-feedback left-text" v-if="errors.description">
							<strong>{{ errors.description[0] }}</strong>
						</span>
					</b-form-group>

					<div class="add-user-btn-group">
						<b-button type="submit" variant="success" class="admin-add-user-add-button" :disabled="loading">
							<template v-if="loading"><b-spinner small label="Small Spinner"></b-spinner></template>
							<template v-else><i class="fa fa-floppy-o" aria-hidden="true"></i> Update</template>
						</b-button>
						<router-link to="/items" class="btn btn-danger admin-add-user-cancel-button"
							><i class="fa fa-times" aria-hidden="true"></i> Cancel</router-link
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
	name: 'UpdateItemPage',
	computed: {
		...mapGetters({
			items: 'items/items',
			updateItem: 'items/updateItem',
			errors: 'items/errors',
			loading: 'items/loading',
			categories: 'category/categories',
		}),
	},
	mounted() {
		this.fetchAllCategories();
		if (this.items.length > 0) {
			this.selectItemToUpdate(this.$route.params.id);
			this.form = { ...this.updateItem };
		} else {
			this.fetchItemsFromUpdateItemPage().then(() => {
				this.selectItemToUpdate(this.$route.params.id);
				this.form = { ...this.updateItem };
			});
		}
	},
	components: {
		Spinner,
	},
	data() {
		return {
			form: this.updateItem,
		};
	},
	methods: {
		...mapActions({
			updateItemDetails: 'items/updateItemDetails',
			selectItemToUpdate: 'items/selectItemToUpdate',
			fetchItemsFromUpdateItemPage: 'items/fetchItemsFromUpdateItemPage',
			fetchAllCategories: 'category/fetchAllCategories',
		}),
		submitForm() {
			this.updateItemDetails(this.form);
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
