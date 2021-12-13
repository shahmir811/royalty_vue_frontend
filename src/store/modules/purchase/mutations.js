export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setPurchaseList = (state, purchases) =>
	(state.purchases = purchases);

export const getPurchaseItemToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updatePurchase = state.purchases.find(purchase => purchase.id === id);
};