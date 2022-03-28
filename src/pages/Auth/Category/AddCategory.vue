<template>
	<div>
		<h1 class="page-title">Add New Category</h1>

		<b-row align-h="center">
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
							<template v-else><i class="fa fa-floppy-o" aria-hidden="true"></i> Add</template>
						</b-button>
						<router-link to="/categories" class="btn btn-danger admin-add-user-cancel-button"
							><i class="fa fa-times" aria-hidden="true"></i> Cancel</router-link
						>
					</div>
				</b-form>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'AddCategoryPage',
	data() {
		return {
			form: {
				name: '',
			},
		};
	},
	computed: {
		...mapGetters({
			loading: 'category/loading',
			errors: 'category/errors',
		}),
	},
	methods: {
		...mapActions({
			addNewCategory: 'category/addNewCategory',
		}),
		submitForm() {
			this.addNewCategory(this.form);
		},
	},
};
</script>

<style lang="scss">
// @import '../styles/styles.scss';
@import '../../../styles/styles.scss';
</style>
