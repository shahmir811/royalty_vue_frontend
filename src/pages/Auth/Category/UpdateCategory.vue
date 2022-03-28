<template>
	<div>
		<h1 class="page-title">Update Category Details</h1>

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

					<div class="add-user-btn-group">
						<b-button type="submit" variant="success" class="admin-add-user-add-button" :disabled="loading">
							<template v-if="loading"><b-spinner small label="Small Spinner"></b-spinner></template>
							<template v-else><i class="fa fa-floppy-o" aria-hidden="true"></i> Update</template>
						</b-button>
						<router-link to="/categories" class="btn btn-danger admin-add-user-cancel-button"
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
	name: 'UpdateCategoryPage',
	components: {
		Spinner,
	},
	mounted() {
		this.fetchCategoriesFromUpdateCategoryPage().then(() => {
			this.selectCategoryToUpdate(this.$route.params.id);
			this.form = { ...this.updateCategory };
		});
	},
	computed: {
		...mapGetters({
			updateCategory: 'category/updateCategory',
			errors: 'category/errors',
			loading: 'category/loading',
		}),
	},
	data() {
		return {
			form: this.updateCategory,
		};
	},
	methods: {
		...mapActions({
			updateCategoryDetails: 'category/updateCategoryDetails',
			selectCategoryToUpdate: 'category/selectCategoryToUpdate',
			fetchCategoriesFromUpdateCategoryPage: 'category/fetchCategoriesFromUpdateCategoryPage',
		}),
		submitForm() {
			this.updateCategoryDetails(this.form);
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
