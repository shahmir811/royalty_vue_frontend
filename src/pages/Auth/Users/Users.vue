<template>
	<div>
		<h1 class="page-title">User Management</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-user">
					<b-button class="admin-users-component-add-new-user-button">
						<i class="fa fa-plus" aria-hidden="true"></i>
						Add User
					</b-button>
				</router-link>
				<router-link
					v-if="selectedUser"
					:to="{
						name: 'update-user',
						params: { id: selectedUser.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button ml-2"
						><i class="fa fa-pencil" aria-hidden="true"></i>
						Update User
					</b-button>
				</router-link>
				<b-button
					v-if="selectedUser"
					href="#"
					class="admin-users-component-change-status-button ml-2"
					@click.prevent="onDeleteHandler(selectedUser.id)"
				>
					<i class="fa fa-times" aria-hidden="true"></i> Remove
				</b-button>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="users"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectUser"
					:showBorders="true"
					:show-row-lines="true"
					@cell-prepared="onCellPrepared"
				>
					<DxColumn data-field="name" :fixed="true" sort-order="asc" />
					<DxColumn data-field="email" />
					<DxColumn data-field="role" alignment="center" />
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
	name: 'Users-Page',
	mounted() {
		this.fetchUsers();
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
			users: 'user/users',
			pageLoad: 'user/pageLoad',
			errors: 'user/errors',
		}),
	},
	data() {
		return {
			selectedUser: undefined,
		};
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
					title: 'Are you sure to remove this user?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						this.changeUserStatus(userId).then(() => {
							this.$swal.fire('Done!', 'User has been removed.', 'success');
						});
					}
				});
		},
		selectUser(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(user => {
				if (user) {
					this.selectedUser = user;
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
