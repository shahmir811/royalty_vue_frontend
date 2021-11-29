import axios from './BaseUrl';
import router from '../routes/router';

export const flashMessage = ({ commit }, alert) => {
	commit('setMessage', alert);

	setTimeout(() => {
		commit('clearMessage');
	}, 3000);
};

/////////////////////// User Forgot password email ///////////////////////
export const userForgotPassword = ({ commit, dispatch }, email) => {
	commit('clearErrors');
	commit('setLoading', true);

	return new Promise((resolve, reject) => {
		axios
			.post(`/userForgotPassword`, { email })
			.then(() => {
				dispatch('flashMessage', {
					message: 'Password reset link has been sent to your email',
					type: 'success',
				});

				commit('setLoading', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setError', error.response.data.errors);
				commit('setLoading', false);
				reject();
			});
	});
};

/////////////////////// Reset Forgot password  ///////////////////////
export const resetPassword = ({ commit, dispatch }, data) => {
	commit('clearErrors');
	commit('setLoading', true);

	return new Promise((resolve, reject) => {
		axios
			.post(`/resetPassword`, data)
			.then(() => {
				dispatch('flashMessage', {
					message: 'Password updated successfully',
					type: 'success',
				});

				commit('setLoading', false);
				resolve();
				router.push('/login');
			})
			.catch(error => {
				console.log(error.response.data.errors);
				commit('setError', error.response.data.errors);
				commit('setLoading', false);
				reject();
			});
	});
};
