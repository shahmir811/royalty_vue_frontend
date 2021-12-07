export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setTaxPercent = (state, data) => {
	state.taxPercent = data.percent;
	state.showTax = data.show_tax ? true : false;
};

export const setShowTax = (state, trueOrFalse) => (state.showTax = trueOrFalse);

export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);
