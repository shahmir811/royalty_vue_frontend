import axios from '../../BaseUrl';
import router from '../../../routes/router';
import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all categories ///////////////////////

export const fetchAllCategories = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'categories';

	try {
		const response = await axios.get(url);

		commit('setCategoriesList', response.data.data.categories);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// add new category ///////////////////////

export const addNewCategory = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'add-category';

		await axios.post(url, data);

		dispatch(
			'flashMessage',
			{
				message: 'Category added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/categories');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Update Category details ///////////////////////
export const updateCategoryDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'update-category';

		await axios.post(`${url}/${data.id}`, data);

		dispatch(
			'flashMessage',
			{
				message: 'Category details updated successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/categories');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		commit('setLoading', false);
	}
};

/////////////////////// Fetch All Categories From Update category page ///////////////////////
export const fetchCategoriesFromUpdateCategoryPage = async ({ commit }) => {
	commit('setLoading', true);

	const url = (await getURL()) + 'categories';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setCategoriesList', response.data.data.categories);
				commit('setLoading', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setLoading', false);
				reject();
			});
	});
};

/////////////////////// Remove category  ///////////////////////
export const removeCategory = async ({ commit, dispatch }, id) => {
	commit('setLoading', true);

	try {
		const url = (await getURL()) + 'remove-category/' + id;

		await axios.delete(`${url}`);

		commit('removeCategoryFromList', id);

		dispatch(
			'flashMessage',
			{
				message: 'Category has been removed',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Select specific item ///////////////////////
export const selectCategoryToUpdate = ({ commit }, id) => {
	commit('clearErrors');
	commit('getCategoryToUpdate', id);
};

/////////////////////// Remove validation errors ///////////////////////
export const clearValidationErrors = ({ commit }) => {
	commit('clearErrors');
};

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
