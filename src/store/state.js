const MainState = {
	message: null,
	type: null,
	apiURL: `${process.env.VUE_APP_BASE_URL}api`,
	loading: false,
	errors: [],
};

export default MainState;
