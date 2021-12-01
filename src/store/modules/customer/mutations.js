export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setCustomersList = (state, customers) =>
	(state.customers = customers);

export const getCustomerToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updateCustomer = state.customers.find(customer => customer.id === id);
};

export const changeCustomerStatus = (state, id) => {
	const customer = state.customers.find(customer => customer.id === id);
	if (customer.status === 'Active') {
		customer.status = 'Deactive';
	} else {
		customer.status = 'Active';
	}
};
