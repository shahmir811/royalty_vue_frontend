import { isEmpty } from 'lodash';
import axios from '../store/BaseUrl';
import localForage from 'localforage';

export const setHttpToken = token => {
	if (isEmpty(token)) {
		axios.defaults.headers.common['Authorization'] = null;
		return;
	}

	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/////////////////////// get URL based on role ///////////////////////
export const getURL = () => {
	return localForage.getItem('userRole').then(role => {
		return role === 'admin' ? 'wadmin/' : 'wemployee/';
	});
};
