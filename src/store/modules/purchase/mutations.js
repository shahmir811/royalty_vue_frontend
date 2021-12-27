export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setSelectedPurchase = (state, payload) =>
	(state.selectedPurchase = payload);

export const setPurchaseList = (state, purchases) =>
	(state.purchases = purchases);

export const getPurchaseItemToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updatePurchase = state.purchases.find(purchase => purchase.id === id);
};

export const removePurchase = (state, id) => {
	return (state.purchases = state.purchases.filter(
		purchase => purchase.id !== id
	));
};

export const changePurchaseStatus = (state, id) => {
	const purchase = state.purchases.find(purchase => purchase.id === id);
	purchase.status = 'Received';
	return state.purchases;
};

export const removeItem = (state, id) => {
	if (state.selectedPurchase) {
		const index = state.selectedPurchase.details.findIndex(
			detail => detail.id === id
		);

		// state.selectedPurchase.total_amount -=
		// 	state.selectedPurchase.details[index].total_amount;

		if (index > -1) {
			const amount = state.selectedPurchase.details[index].total_price;
			state.selectedPurchase.total_amount -= amount;
			state.selectedPurchase.details.splice(index, 1);
		}

		// return state.selectedPurchase.details.filter(
		// 	detail => detail.id !== parseInt(id)
		// );
	}
};
