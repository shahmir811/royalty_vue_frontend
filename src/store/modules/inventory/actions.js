import axios from '../../BaseUrl';
import router from '../../../routes/router';

import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all inventory items ///////////////////////

export const fetchInventory = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'inventory-list';

	try {
		const response = await axios.get(url);

		commit('setInventoryList', response.data.data.inventories);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
	}
};

/////////////////////// Fetch all inventory items ///////////////////////

export const fetchLocationBasedInventory = async ({ commit, dispatch }, locationId) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'location-based-inventory/' + locationId;

	try {
		const response = await axios.get(url);

		commit('setInventoryList', response.data.data.inventories);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
	}
};

/////////////////////// add new inventory item ///////////////////////

export const addNewInventoryItem = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'add-inventoryItem';

		await axios.post(url, data);

		dispatch(
			'flashMessage',
			{
				message: 'New inventory item added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/inventory');
	} catch (error) {
		console.log(error);
		const status = error.response.status;
		if (status === 422) {
			dispatch(
				'flashMessage',
				{
					message: 'Oops! something went wrong. Please try again',
					type: 'danger',
				},
				{ root: true }
			);
		}
		commit('setError', error.response.data.errors);
		checkAndRedirect(status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Update inventory item ///////////////////////
export const updateInventoryItemDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'update-inventoryItem';

		await axios.post(`${url}/${data.id}`, data);

		dispatch(
			'flashMessage',
			{
				message: 'Inventory Item details updated successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/inventory');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Fetch All inventory items From Update inventory detail page ///////////////////////
export const fetchInventoryItemsFromUpdateInventoryItemPage = async ({ commit, dispatch }) => {
	commit('setLoading', true);

	const url = (await getURL()) + 'inventory-list';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setInventoryList', response.data.data.inventories);
				commit('setLoading', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setLoading', false);
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
};

/////////////////////// Select specific inventory item ///////////////////////
export const selectInventoryToUpdate = ({ commit }, id) => {
	commit('clearErrors');
	commit('getInventoryToUpdate', id);
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
