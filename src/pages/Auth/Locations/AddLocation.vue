<template>
	<div>
		<h1 class="page-title">Add new Location</h1>

		<b-row align-h="center">
			<b-col cols="8">
				<b-form @submit.prevent="submitForm">
					<b-form-group
						id="input-group-1"
						label="Name:"
						label-for="input-1"
						class="input-form-label"
					>
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

					<b-form-group
						id="input-group-2"
						label="Contact No:"
						label-for="input-2"
						class="input-form-label"
					>
						<b-form-input
							id="input-2"
							v-model="form.contact_no"
							placeholder="Enter contact no"
							:class="{ 'is-invalid': errors.contact_no }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.contact_no">
							<strong>{{ errors.contact_no[0] }}</strong>
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
								><i class="fa fa-floppy-o" aria-hidden="true"></i> Add</template
							>
						</b-button>
						<router-link
							to="/locations"
							class="btn btn-danger admin-add-user-cancel-button"
							><i class="fa fa-times" aria-hidden="true"></i>
							Cancel</router-link
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
	name: 'AddLocationPage',
	mounted() {
		this.clearValidationErrors();
	},
	computed: {
		...mapGetters({
			loading: 'location/loading',
			errors: 'location/errors',
		}),
	},
	data() {
		return {
			form: {
				name: '',
				contact_no: '',
			},
		};
	},
	methods: {
		...mapActions({
			addNewLocation: 'location/addNewLocation',
			clearValidationErrors: 'location/clearValidationErrors',
		}),
		submitForm() {
			this.addNewLocation(this.form);
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
