import axios from '../../BaseUrl';
import router from '../../../routes/router';

/////////////////////// Fetch users list ///////////////////////

export const fetchUsers = async ({ commit }) => {
	commit('startPageLoad');

	try {
		const response = await axios.get(`wadmin/users`);

		commit('setUsersList', response.data.data.users);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
	}
};

/////////////////////// Add User ///////////////////////
export const addNewUser = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		await axios.post('/wadmin/add-user', data);

		dispatch(
			'flashMessage',
			{
				message: 'New user added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/users');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		commit('setLoading', false);
	}
};

/////////////////////// Fetch All Users From Update users ///////////////////////
export const fetchUsersFromUpdateUserPage = ({ commit }) => {
	commit('setLoading', true);

	return new Promise((resolve, reject) => {
		axios
			.get('/wadmin/users')
			.then(response => {
				commit('setUsersList', response.data.data.users);
				commit('setLoading', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setLoading', false);
				reject();
			});
	});
};

/////////////////////// Update User ///////////////////////
export const UpdateUserDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		await axios.post(`/wadmin/update-user/${data.id}`, data);

		dispatch(
			'flashMessage',
			{
				message: 'User details updated successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/users');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		commit('setLoading', false);
	}
};

/////////////////////// Select specific user ///////////////////////
export const selectUserToUpdate = ({ commit }, id) => {
	commit('clearErrors');
	commit('getUserToUpdate', id);
};

/////////////////////// Change User Status ///////////////////////
export const changeUserStatus = ({ commit }, userId) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`wadmin/change-user-status/${userId}`)
			.then(() => {
				commit('changeUserStatus', userId);
				resolve();
			})
			.catch(error => {
				console.log(error);
				reject();
			});
	});
};

/////////////////////// Clear all users state ///////////////////////
export const clearUserState = ({ commit }) => {
	commit('resetUserState');
};
