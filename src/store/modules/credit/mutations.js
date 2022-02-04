export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setTotal = (state, payload) =>
	(state.total = payload ? payload : null);

export const setDueAmount = (state, payload) =>
	(state.dueAmount = payload !== null ? payload : null);

export const setServerRequest = (state, trueOrFalse) =>
	(state.serverRequest = trueOrFalse);

export const setSelectedCustomerRecord = (state, { id, name }) => {
	state.selectedCustomerId = id;
	state.selectedCustomerName = name;
};

export const clearCustomerRecord = state => {
	state.selectedCustomerName = null;
	state.selectedCustomerId = null;
};

export const setFetchingCreditDetails = (state, trueOrFalse) =>
	(state.fetchingCreditDetails = trueOrFalse);

export const setFetchingPaymentDetails = (state, trueOrFalse) =>
	(state.fetchingPaymentDetails = trueOrFalse);

export const setCreditRecordsData = (state, payload) =>
	(state.creditRecords = payload);

export const setPaymentRecordsData = (state, payload) =>
	(state.payments = payload);

export const setCustomersList = (state, customers) =>
	(state.customers = customers);

export const pushLatestPayment = (state, payload) =>
	state.payments.unshift(payload);

export const setCustomerSalesDropDownRecord = (state, payload) => {
	state.customerSales = payload ? payload : null;
};

export const removeCreditRow = (state, creditId) => {
	state.creditRecords = state.creditRecords.filter(
		record => record.id !== creditId
	);
};

export const addCreditRow = (state, payload) =>
	state.creditRecords.unshift(payload);
