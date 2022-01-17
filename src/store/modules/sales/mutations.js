export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setSelectedSale = (state, payload) =>
	(state.selectedSale = payload);

export const setSalesList = (state, payload) => (state.sales = payload);

export const setSalesStatuses = (state, payload) => (state.statuses = payload);

export const updateSelectedSaleData = (state, payload) =>
	(state.selectedSale = payload);

export const setLatestInvoiceNo = (state, invoiceNo) =>
	(state.latestInvoiceNo = invoiceNo);

export const setFetchInvoiceNumber = (state, trueOrFalse) =>
	(state.fetchInvoiceNo = trueOrFalse);
