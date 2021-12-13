<template>
	<div>
		<h1 class="page-title">UpdateCustomer page</h1>

		<b-row align-h="center" v-if="form">
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
						label="Mark:"
						label-for="input-2"
						class="input-form-label"
					>
						<b-form-input
							id="input-2"
							v-model="form.mark"
							placeholder="Enter mark"
							:class="{ 'is-invalid': errors.mark }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.mark">
							<strong>{{ errors.mark[0] }}</strong>
						</span>
					</b-form-group>

					<div class="form-group input-form-label text-left">
						<label for="changeCountry">Country:</label>
						<select
							class="form-control"
							id="changeCountry"
							v-model="form.country"
							@change="onChangeHandler($event)"
						>
							<option
								v-for="country in countries"
								:key="country.id"
								:value="country.value"
							>
								{{ country.text }}
							</option>
						</select>
					</div>

					<b-form-group
						id="input-group-4"
						label="Dubai Contact No:"
						label-for="input-4"
						class="input-form-label"
					>
						<b-form-input
							id="input-4"
							v-model="form.mobile_no_dubai"
							placeholder="Enter country number"
							:class="{ 'is-invalid': errors.mobile_no_dubai }"
						></b-form-input>
						<span
							class="invalid-feedback left-text"
							v-if="errors.mobile_no_dubai"
						>
							<strong>{{ errors.mobile_no_dubai[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group
						id="input-group-5"
						label="Country Contact No:"
						label-for="input-5"
						class="input-form-label"
					>
						<b-form-input
							id="input-5"
							v-model="form.mobile_no_country"
							placeholder="Enter country number"
							:class="{ 'is-invalid': errors.mobile_no_country }"
						></b-form-input>
						<span
							class="invalid-feedback left-text"
							v-if="errors.mobile_no_country"
						>
							<strong>{{ errors.mobile_no_country[0] }}</strong>
						</span>
					</b-form-group>

					<b-form-group
						id="input-group-6"
						label="Country Contact No:"
						label-for="input-6"
						class="input-form-label"
					>
						<b-form-textarea
							id="input-6"
							v-model="form.cargo_address"
							placeholder="Cargo address"
							:class="{ 'is-invalid': errors.cargo_address }"
						></b-form-textarea>
						<span
							class="invalid-feedback left-text"
							v-if="errors.cargo_address"
						>
							<strong>{{ errors.cargo_address[0] }}</strong>
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
							to="/customers"
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
	name: 'UpdateCustomerPage',
	computed: {
		...mapGetters({
			customers: 'customer/customers',
			updateCustomer: 'customer/updateCustomer',
			errors: 'customer/errors',
			loading: 'customer/loading',
			countries: 'customer/countries',
		}),
	},
	mounted() {
		if (this.customers.length > 0) {
			this.selectCustomerToUpdate(this.$route.params.id);
			this.form = { ...this.updateCustomer };
		} else {
			this.fetchCustomersFromUpdateCustomerPage().then(() => {
				this.selectCustomerToUpdate(this.$route.params.id);
				this.form = { ...this.updateCustomer };
			});
		}
	},
	components: {
		Spinner,
	},
	data() {
		return {
			form: this.updateCustomer,
		};
	},
	methods: {
		...mapActions({
			updateCustomerDetails: 'customer/updateCustomerDetails',
			selectCustomerToUpdate: 'customer/selectCustomerToUpdate',
			fetchCustomersFromUpdateCustomerPage:
				'customer/fetchCustomersFromUpdateCustomerPage',
		}),
		submitForm() {
			this.updateCustomerDetails(this.form);
		},
		onChangeHandler(event) {
			this.form.country = event.target.value;
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
