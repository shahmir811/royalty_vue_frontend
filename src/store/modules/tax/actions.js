import axios from '../../BaseUrl';
import router from '../../../routes/router';
import { getURL } from '../../../helpers/index';

/////////////////////// Get Tax details ///////////////////////

export const fetchTaxDetails = async ({ commit }) => {
	commit('startPageLoad', true);

	const url = (await getURL()) + 'tax-details';

	try {
		const response = await axios.get(url);

		commit('setTaxPercent', response.data.data.tax);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		commit('endPageLoad');
	}
};

/////////////////////// Update Tax Details ///////////////////////

export const updateTaxDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'update-tax-details';

		await axios.post(url, data);

		dispatch('fetchTaxDetails');

		dispatch(
			'flashMessage',
			{
				message: 'Tax Details Updated',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/tax');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		commit('setLoading', false);
	}
};

/////////////////////// Get Tax details ///////////////////////

export const getTaxFromUpdateTaxPage = async ({ commit }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'tax-details';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setTaxPercent', response.data.data.tax);
				commit('endPageLoad');
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('endPageLoad');
				reject();
			});
	});
};
