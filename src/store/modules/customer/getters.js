import { countriesData } from './countries';

export const loading = state => state.loading;

export const pageLoad = state => state.pageLoad;

export const customers = state => state.customers;

export const errors = state => state.errors;

export const customerDetails = state => state.customerDetails;

export const countries = state => {
	return (state.countries = countriesData.map((country, index) => {
		return {
			...country,
			value: country.text,
			id: ++index,
		};
	})).sort((a, b) => (a.text > b.text ? 1 : b.text > a.text ? -1 : 0));
};

export const updateCustomer = state => state.updateCustomer;
