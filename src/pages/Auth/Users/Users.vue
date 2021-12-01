<template>
	<div>
		<h1 class="page-title">User Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-user">
					<b-button class="admin-users-component-add-new-user-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add User</b-button
					>
				</router-link>
			</b-row>

			<b-row class="pr-20">
				<table class="table table-hover">
					<thead class="table-header-class">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(user, index) in users" :key="user.id">
							<td scope="row">{{ ++index }}</td>
							<td>{{ user.name }}</td>
							<td>{{ user.email }}</td>
							<td>{{ capitalize(user.role) }}</td>
							<td :class="user.status">{{ user.status }}</td>
							<td>
								<router-link
									class="update-user-link mr-2"
									:to="{
										name: 'update-user',
										params: { id: user.id },
									}"
								>
									<i class="fa fa-pencil" aria-hidden="true"></i>
								</router-link>
								<a
									href="#"
									class="update-user-delete-link"
									@click.prevent="onDeleteHandler(user.id)"
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
	name: 'Users-Page',
	mounted() {
		this.fetchUsers();
	},
	components: {
		Spinner,
	},
	computed: {
		...mapGetters({
			users: 'user/users',
			pageLoad: 'user/pageLoad',
			errors: 'user/errors',
		}),
	},
	methods: {
		...mapActions({
			fetchUsers: 'user/fetchUsers',
			changeUserStatus: 'user/changeUserStatus',
		}),
		capitalize(role) {
			return role[0].toUpperCase() + role.slice(1);
		},
		onDeleteHandler(userId) {
			this.$swal
				.fire({
					title: 'Are you sure to change this user status?',
					// text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, change it!',
				})
				.then(result => {
					if (result.value) {
						this.changeUserStatus(userId).then(() => {
							this.$swal.fire(
								'Done!',
								'User status has been changed.',
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

.table-header-class {
	background: $BROWN-5;
}

.admin-users-component-add-new-user-button {
	width: 117px;
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

.update-user-delete-link {
	color: $RED-3;
}

.Active {
	color: $CONFIRMED;
}

.Deactive {
	color: $RED-3;
}
</style>
