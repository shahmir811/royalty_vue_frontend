<template>
	<div>
		<h1 class="page-title">Categories</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-category">
					<b-button class="admin-users-component-add-new-location-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add</b-button
					>
				</router-link>
				<router-link
					v-if="selectedCategory"
					:to="{
						name: 'update-category',
						params: { id: selectedCategory.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-190 ml-2"
						><i class="fa fa-pencil" aria-hidden="true"></i>
						Update
					</b-button>
				</router-link>

				<b-button
					v-if="selectedCategory"
					href="#"
					class="admin-users-component-change-status-button ml-2"
					@click.prevent="onDeleteHandler(selectedCategory.id)"
				>
					<i class="fa fa-times" aria-hidden="true"></i> Remove
				</b-button>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="categories"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectCategory"
					:showBorders="true"
					:show-row-lines="true"
					:word-wrap-enabled="true"
				>
					<DxColumn data-field="name" :fixed="true" sort-order="asc" :width="400" />

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
	name: 'CategoriesListPage',
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
	mounted() {
		this.fetchAllCategories();
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			categories: 'category/categories',
			pageLoad: 'category/pageLoad',
			errors: 'category/errors',
		}),
	},
	data() {
		return {
			selectedCategory: undefined,
		};
	},
	methods: {
		...mapActions({
			fetchAllCategories: 'category/fetchAllCategories',
			removeCategory: 'category/removeCategory',
		}),
		selectCategory(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(category => {
				if (category) {
					this.selectedCategory = category;
				}
			});
		},
		onDeleteHandler(categoryId) {
			this.$swal
				.fire({
					title: 'Are you sure to remove this category?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						this.removeCategory(categoryId).then(() => {
							this.$swal.fire('Done!', 'User has been removed.', 'success');
						});
					}
				});
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
