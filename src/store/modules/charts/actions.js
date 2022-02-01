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

/////////////////////// get Sales Record between specific dates ///////////////////////
export const getSalesRecordBetweenSpecificDates = async (
	{ commit, dispatch },
	dateRange
) => {
	commit('setLoading', true);

	const { start, end } = dateRange;

	const url =
		(await getURL()) + `get-sales-between-dates?start=${start}&&end=${end}`;

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setSalesDataBetweenDates', {
					records: response.data.data.records,
					...dateRange,
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

/////////////////////// get yearly sales record ///////////////////////
export const getYearlySalesRecordFromServer = async (
	{ commit, dispatch },
	year
) => {
	commit('setFetchingSales', true);

	const url = (await getURL()) + `get-yearly-sales?year=${year}`;

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setYearlySalesRecord', {
					records: response.data.data.records,
					year,
				});
				commit('setFetchingSales', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				commit('setFetchingSales', false);
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
