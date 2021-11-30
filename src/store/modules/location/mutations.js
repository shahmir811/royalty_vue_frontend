export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLocationsList = (state, locations) =>
	(state.locations = locations);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const getLocationToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updateLocation = state.locations.find(location => location.id === id);
};

export const changeLocationStatus = (state, id) => {
	const location = state.locations.find(location => location.id === id);
	if (location.status === 'Active') {
		location.status = 'Deactive';
	} else {
		location.status = 'Active';
	}
};
