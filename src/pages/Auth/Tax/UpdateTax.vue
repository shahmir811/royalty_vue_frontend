<template>
	<div>
		<h1 class="page-title">Update Tax</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row align-h="center">
				<b-col cols="8">
					<b-form @submit.prevent="submitForm">
						<b-form-group
							id="input-group-1"
							label="Tax Percent (%):"
							label-for="input-1"
							class="input-form-label"
						>
							<b-form-input
								id="input-1"
								v-model="taxPercent"
								step="any"
								type="number"
								placeholder="Enter tax percent"
								:class="{ 'is-invalid': errors.percent }"
							></b-form-input>
							<span class="invalid-feedback left-text" v-if="errors.percent">
								<strong>{{ errors.percent[0] }}</strong>
							</span>
						</b-form-group>

						<b-form-group
							id="input-group-2"
							label="Get Updates:"
							label-for="input-2"
							class="input-form-label text-left"
						>
							<b-form-checkbox id="checkbox-1" v-model="showTax">
							</b-form-checkbox>
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
								:class="{ disableClick: loading }"
								to="/tax"
								class="btn btn-danger admin-add-user-cancel-button"
								><i class="fa fa-times" aria-hidden="true"></i>
								Cancel</router-link
							>
						</div>
					</b-form>
				</b-col>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'UpdateTaxPage',
	mounted() {
		if (!this.taxPercent && this.isAuthenticated) {
			this.getTax().then(() => {
				this.showTax = this.show;
				this.taxPercent = this.tax;
			});
		}
	},
	components: {
		Spinner,
	},
	computed: {
		...mapGetters({
			errors: 'tax/errors',
			loading: 'tax/loading',
			show: 'tax/showTax',
			tax: 'tax/taxPercent',
			pageLoad: 'tax/pageLoad',
			isAuthenticated: 'auth/isAuthenticated',
		}),
	},
	data() {
		return {
			showTax: false,
			taxPercent: 0,
		};
	},
	methods: {
		...mapActions({
			updateTaxDetails: 'tax/updateTaxDetails',
			getTax: 'tax/getTaxFromUpdateTaxPage',
		}),
		submitForm() {
			this.updateTaxDetails({
				percent: this.taxPercent,
				show_tax: this.showTax,
			});
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
