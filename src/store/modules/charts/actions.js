import axios from '../../BaseUrl';
import { getURL } from '../../../helpers/index';

/////////////////////// get weekly Sales ///////////////////////
export const getWeeklySales = async ({ commit, dispatch }) => {
	const url = (await getURL()) + 'get-weekly-sales';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setWeeklySale', response.data.data.records);

				resolve();
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
};

/////////////////////// get Sales Record from Server ///////////////////////

export const getSalesRecordFromServer = async ({ commit, dispatch }, range) => {
	commit('setLoading', true);
	const url = (await getURL()) + 'get-sales?days=' + range;

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setSalesData', {
					records: response.data.data.records,
					days: range,
				});
				commit('setLoading', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				commit('setLoading', false);
				reject();
			});
	});
};

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
