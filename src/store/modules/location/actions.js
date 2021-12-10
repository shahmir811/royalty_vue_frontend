import axios from '../../BaseUrl';
import router from '../../../routes/router';

import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all locations ///////////////////////

export const fetchLocations = async ({ commit }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'locations';

	try {
		const response = await axios.get(url);

		commit('setLocationsList', response.data.data.locations);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
	}
};

/////////////////////// Fetch active locations ///////////////////////

export const fetchActiveLocations = async ({ commit }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'active-locations';

	try {
		const response = await axios.get(url);

		commit('setActiveLocationsList', response.data.data.locations);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
	}
};

/////////////////////// add new location ///////////////////////

export const addNewLocation = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'add-location';

		await axios.post(url, data);

		dispatch(
			'flashMessage',
			{
				message: 'New location added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/locations');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		commit('setLoading', false);
	}
};

/////////////////////// Update Location ///////////////////////
export const updateLocationDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'update-location';

		await axios.post(`${url}/${data.id}`, data);

		dispatch(
			'flashMessage',
			{
				message: 'Location details updated successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/locations');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		commit('setLoading', false);
	}
};

/////////////////////// Fetch All Locations From Update locations ///////////////////////
export const fetchLocationsFromUpdateLocationPage = async ({ commit }) => {
	commit('setLoading', true);

	const url = (await getURL()) + 'locations';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setLocationsList', response.data.data.locations);
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

/////////////////////// Select specific location ///////////////////////
export const selectLocationToUpdate = ({ commit }, id) => {
	commit('clearErrors');
	commit('getLocationToUpdate', id);
};

/////////////////////// Remove validation errors ///////////////////////
export const clearValidationErrors = ({ commit }) => {
	commit('clearErrors');
};

/////////////////////// change locations status ///////////////////////

export const changeLocationStatus = async ({ commit }, locationId) => {
	const url = (await getURL()) + 'change-location-status';

	return new Promise((resolve, reject) => {
		axios
			.get(`${url}/${locationId}`)
			.then(() => {
				commit('changeLocationStatus', locationId);
				resolve();
			})
			.catch(error => {
				console.log(error);
				reject();
			});
	});
};
