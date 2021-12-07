export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setUsersList = (state, payload) => (state.users = payload);

export const setUpdateUser = (state, payload) => (state.updateUser = payload);

export const getUserToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updateUser = state.users.find(user => user.id === id);
};

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const changeUserStatus = (state, id) => {
	const user = state.users.find(user => user.id === id);
	if (user.status === 'Active') {
		user.status = 'Deactive';
	} else {
		user.status = 'Active';
	}
};

export const resetUserState = state => {
	state.users = [];
	state.loading = false;
	state.errors = [];
	state.updateUser = null;
};
