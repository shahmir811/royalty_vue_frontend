import axios from '../../BaseUrl';
import router from '../../../routes/router';
import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all items ///////////////////////

export const fetchAllItems = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'items-list';

	try {
		const response = await axios.get(url);

		commit('setItemsList', response.data.data.items);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// add new item ///////////////////////

export const addNewItem = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'add-item';

		await axios.post(url, data);

		dispatch(
			'flashMessage',
			{
				message: 'Item added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/items');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Update Item details ///////////////////////
export const updateItemDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'update-item';

		await axios.post(`${url}/${data.id}`, data);

		dispatch(
			'flashMessage',
			{
				message: 'Item details updated successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/items');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		commit('setLoading', false);
	}
};

/////////////////////// Fetch All Items From Update item page ///////////////////////
export const fetchItemsFromUpdateItemPage = async ({ commit }) => {
	commit('setLoading', true);

	const url = (await getURL()) + 'items-list';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setItemsList', response.data.data.items);
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

/////////////////////// Select specific item ///////////////////////
export const selectItemToUpdate = ({ commit }, id) => {
	commit('clearErrors');
	commit('getItemToUpdate', id);
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
