export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setCategoriesList = (state, categories) => (state.categories = categories);

export const getCategoryToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updateCategory = state.categories.find(item => item.id === id);
};

export const removeCategoryFromList = (state, id) => {
	state.categories = state.categories.filter(category => category.id !== id);
};
