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
						><i class="fa fa-plus" aria-hidden="true"></i> Add
						Location</b-button
					>
				</router-link>
			</b-row>

			<b-row class="pr-20">
				<table class="table table-hover">
					<thead class="table-header-class">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Contact No</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(location, index) in locations" :key="location.id">
							<td scope="row">{{ ++index }}</td>
							<td>{{ location.name }}</td>
							<td>{{ location.contact_no }}</td>
							<td :class="location.status">{{ location.status }}</td>
							<td>
								<router-link
									class="update-user-link mr-2"
									:to="{
										name: 'update-location',
										params: { id: location.id },
									}"
								>
									<i class="fa fa-pencil" aria-hidden="true"></i>
								</router-link>
								<a
									v-if="role === 'admin'"
									href="#"
									class="update-user-delete-link"
									@click.prevent="onDeleteHandler(location.id)"
									><i class="fa fa-handshake-o" aria-hidden="true"></i
								></a>
							</td>
						</tr>
					</tbody>
				</table>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'LocationsPage',
	mounted() {
		this.fetchLocations();
	},
	components: {
		Spinner,
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			locations: 'location/locations',
			pageLoad: 'location/pageLoad',
			errors: 'location/errors',
		}),
	},
	methods: {
		...mapActions({
			fetchLocations: 'location/fetchLocations',
			changeLocationStatus: 'location/changeLocationStatus',
		}),
		onDeleteHandler(locationId) {
			this.$swal
				.fire({
					title: 'Are you sure to change this location status?',
					// text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, change it!',
				})
				.then(result => {
					if (result.value) {
						this.changeLocationStatus(locationId).then(() => {
							this.$swal.fire(
								'Done!',
								'Location status has been changed.',
								'success'
							);
						});
					}
				});
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
