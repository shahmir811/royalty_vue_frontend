export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setSelectedItem = (state, payload) =>
	(state.selectedItem = payload);

export const setItemsList = (state, items) => (state.items = items);

export const getItemToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updateItem = state.items.find(item => item.id === id);
};
