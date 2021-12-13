<template>
	<div>
		<h1 class="page-title">Update Location</h1>

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
						label="Contact No:"
						label-for="input-2"
						class="input-form-label"
					>
						<b-form-input
							id="input-2"
							v-model="form.contact_no"
							placeholder="Enter contact number"
							:class="{ 'is-invalid': errors.contact_no }"
						></b-form-input>
						<span class="invalid-feedback left-text" v-if="errors.contact_no">
							<strong>{{ errors.contact_no[0] }}</strong>
						</span>
					</b-form-group>

					<div class="add-location-btn-group">
						<b-button
							type="submit"
							variant="success"
							class="admin-add-location-add-button"
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
							to="/locations"
							class="btn btn-danger admin-add-location-cancel-button"
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
	name: 'UpdateLocationPage',
	computed: {
		...mapGetters({
			locations: 'location/locations',
			updateLocation: 'location/updateLocation',
			errors: 'location/errors',
			loading: 'location/loading',
		}),
	},
	mounted() {
		if (this.locations.length > 0) {
			this.selectLocationToUpdate(this.$route.params.id);
			this.form = { ...this.updateLocation };
		} else {
			this.fetchLocationsFromUpdateLocationPage().then(() => {
				this.selectLocationToUpdate(this.$route.params.id);
				this.form = { ...this.updateLocation };
			});
		}
	},
	components: {
		Spinner,
	},
	data() {
		return {
			form: this.updateLocation,
		};
	},
	methods: {
		...mapActions({
			updateLocationDetails: 'location/updateLocationDetails',
			selectLocationToUpdate: 'location/selectLocationToUpdate',
			fetchLocationsFromUpdateLocationPage:
				'location/fetchLocationsFromUpdateLocationPage',
		}),
		submitForm() {
			this.updateLocationDetails(this.form);
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.add-location-btn-group {
	display: flex;
}

.admin-add-location-add-button {
	width: 117px;
	height: 45px;
	background: $BROWN-10 !important;
	margin-right: 5px;
}

.admin-add-location-cancel-button {
	width: 117px;
	height: 45px;
	padding-top: 9px !important;
}
</style>
