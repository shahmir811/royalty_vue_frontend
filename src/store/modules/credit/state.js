const CreditState = {
	customers: [],
	loading: false,
	pageLoad: false,
	errors: [],
	fetchingCreditDetails: false,
	selectedCustomerId: null,
	selectedCustomerName: null,
	creditRecords: [],
	fetchingPaymentDetails: false,
	payments: [],
	serverRequest: false,
	total: null,
	dueAmount: null,
	customerSales: [],
};

export default CreditState;
