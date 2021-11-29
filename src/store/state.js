const MainState = {
	message: null,
	type: null,
	apiURL: `${process.env.VUE_APP_APP_URL}api`,
	loading: false,
	errors: [],
};

export default MainState;
