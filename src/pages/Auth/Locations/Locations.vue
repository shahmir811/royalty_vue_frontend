<template>
	<div>
		<h1 class="page-title">Location Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-location">
					<b-button class="admin-users-component-add-new-location-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add Location</b-button
					>
				</router-link>
				<router-link
					v-if="selectedLocation"
					:to="{
						name: 'update-location',
						params: { id: selectedLocation.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-190 ml-2"
						><i class="fa fa-pencil" aria-hidden="true"></i>
						Update Location
					</b-button>
				</router-link>
				<b-button
					v-if="role === 'admin' && selectedLocation"
					href="#"
					class="admin-users-component-change-status-button ml-2"
					@click.prevent="onDeleteHandler(selectedLocation.id)"
				>
					<i class="fa fa-times" aria-hidden="true"></i> Remove
				</b-button>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="locations"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectLocation"
					:showBorders="true"
					:show-row-lines="true"
					@cell-prepared="onCellPrepared"
				>
					<DxColumn data-field="name" :fixed="true" sort-order="asc" />
					<DxColumn data-field="contact_no" caption="Contact" alignment="center" />
					<DxColumn data-field="status" alignment="center" />

					<DxSelection mode="single" />
					<DxFilterRow :visible="true" />
					<DxSearchPanel :visible="true" />
					<DxPaging :enabled="true" :page-size="25" />
					<DxPager :show-navigation-buttons="true" :show-info="true" info-text="Page #{0}. Total: {1} ({2} items)" />
				</DxDataGrid>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
	DxDataGrid,
	DxColumn,
	DxFilterRow,
	DxSearchPanel,
	DxSelection,
	DxPaging,
	DxPager,
} from 'devextreme-vue/data-grid';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'LocationsPage',
	mounted() {
		this.fetchLocations();
	},
	components: {
		Spinner,
		DxDataGrid,
		DxColumn,
		DxFilterRow,
		DxSearchPanel,
		DxSelection,
		DxPaging,
		DxPager,
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			locations: 'location/locations',
			pageLoad: 'location/pageLoad',
			errors: 'location/errors',
		}),
	},
	data() {
		return {
			selectedLocation: undefined,
		};
	},
	methods: {
		...mapActions({
			fetchLocations: 'location/fetchLocations',
			changeLocationStatus: 'location/changeLocationStatus',
		}),
		onDeleteHandler(locationId) {
			this.$swal
				.fire({
					title: 'Are you sure to remove this location?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						this.changeLocationStatus(locationId).then(() => {
							this.$swal.fire('Done!', 'Location has been removed.', 'success');
						});
					}
				});
		},
		selectLocation(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(location => {
				if (location) {
					this.selectedLocation = location;
				}
			});
		},
		onCellPrepared(e) {
			if (e.rowType == 'data' && e.column.dataField == 'status') {
				if (e.data.status === 'Deactive') {
					e.cellElement.className += ' deactive';
				}
			}
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.admin-users-component-add-new-location-button {
	width: 160px;
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
