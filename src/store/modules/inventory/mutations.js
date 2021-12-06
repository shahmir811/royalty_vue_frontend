export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, errors) => (state.errors = errors);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setInventoryList = (state, items) => (state.inventories = items);

export const getInventoryToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updateInventory = state.inventories.find(invt => invt.id === id);
};
