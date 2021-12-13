<template>
	<div>
		<h1 class="page-title">Tax</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-container class="bv-example-row mt-50">
				<b-row>
					<b-col class="text-left">
						<h4>Tax Percent(%):</h4>
					</b-col>
					<b-col class="text-left">
						<h4>{{ taxPercent }}</h4>
					</b-col>
				</b-row>
				<b-row>
					<b-col class="text-left"><h4>Get updates:</h4></b-col>
					<b-col class="text-left">
						<input
							class="form-check-input ml-1"
							type="checkbox"
							value=""
							id="defaultCheck2"
							v-model="showTax"
							disabled
						/>
					</b-col>
				</b-row>
				<b-row>
					<router-link
						:to="{
							name: 'update-tax',
						}"
					>
						<b-button class="admin-users-component-updateTax-button mt-20"
							><i class="fa fa-pencil" aria-hidden="true"></i>
							Update Tax Details
						</b-button>
					</router-link>
				</b-row>
			</b-container>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'TaxPage',
	mounted() {
		if (!this.taxPercent && this.isAuthenticated) {
			this.fetchTaxDetails();
		}
	},
	components: {
		Spinner,
	},
	computed: {
		...mapGetters({
			showTax: 'tax/showTax',
			taxPercent: 'tax/taxPercent',
			pageLoad: 'tax/pageLoad',
			isAuthenticated: 'auth/isAuthenticated',
		}),
	},
	data() {
		return {
			// taxPercent: this.taxPercent,
		};
	},
	methods: {
		...mapActions({
			fetchTaxDetails: 'tax/fetchTaxDetails',
		}),
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.admin-users-component-updateTax-button {
	width: 220px;
	height: 45px;
	background: $BROWN-10 !important;
	margin-bottom: 15px;

	a {
		@extend .regular-16px-24px;
		color: $GREY-1 !important;

		&:hover {
			outline: none;
			border: none;
		}

		&:hover {
			@extend .regular-16px-24px;
			background: $BROWN-11 !important;
		}
	}
}
</style>
