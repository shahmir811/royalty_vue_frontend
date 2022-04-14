import moment from 'moment';

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setFetchingSales = (state, trueOrFalse) => (state.fetchingSales = trueOrFalse);

export const setSalesData = (state, { records, days }) => {
	// getAllDatesSale(records, days);
	state.title = `Last ${days} days Sale`;
	state.salesData = getAllDatesSale(records, days);
};

const getAllDatesSale = (comingRecords, days) => {
	const records = [];
	const currentDate = moment().format('Y-MM-D');
	let startDate = moment().subtract(days, 'days').format('Y-MM-D');

	// If you want an inclusive end date (fully-closed interval)
	for (const m = moment(startDate); m.diff(currentDate, 'days') <= 0; m.add(1, 'days')) {
		const data = {
			margin: 0,
			sale: 0,
			// day: `${m.format('ddd')} (${m.format('D/MMM')})`,
			day: `${m.format('D')}`,
			date_at: m.format('Y-MM-DD'),
		};

		records.push(data);
	}

	comingRecords.map(data => {
		const date_at = data.date_at;
		const index = records.findIndex(r => r.date_at === date_at);
		if (index > -1) {
			records[index].margin += data.margin;
			records[index].sale += data.sale;
		}
	});

	return records;
};

export const setSalesDataBetweenDates = (state, data) => {
	const { start, end } = data;
	state.title = `Sales data from ${start} to ${end}`;
	state.salesData = getSalesBetweenDates(data);
};

const getSalesBetweenDates = data => {
	const { start, end, records: comingRecords } = data;

	const records = [];
	let startDate = start;
	const currentDate = end;

	// If you want an inclusive end date (fully-closed interval)
	for (const m = moment(startDate); m.diff(currentDate, 'days') <= 0; m.add(1, 'days')) {
		const data = {
			margin: 0,
			sale: 0,
			// day: `${m.format('ddd')} (${m.format('D/MMM')})`,
			day: `${m.format('D')}`,
			date_at: m.format('Y-MM-DD'),
		};

		records.push(data);
	}

	comingRecords.map(data => {
		const date_at = data.date_at;

		const index = records.findIndex(r => r.date_at === date_at);
		if (index > -1) {
			records[index].margin += data.margin;
			records[index].sale += data.sale;
		}
	});

	return records;
};

export const setYearlySalesRecord = (state, data) => {
	const { records, year } = data;

	state.yearlySalesTitle = `Sales Record for year: ${year}`;
	state.yearlySales = getYearlySales(records);
};

const getYearlySales = sales => {
	const records = [
		{ id: 1, Month: 'January', margin: 0, sale: 0 },
		{ id: 2, Month: 'February', margin: 0, sale: 0 },
		{ id: 3, Month: 'March', margin: 0, sale: 0 },
		{ id: 4, Month: 'April', margin: 0, sale: 0 },
		{ id: 5, Month: 'May', margin: 0, sale: 0 },
		{ id: 6, Month: 'June', margin: 0, sale: 0 },
		{ id: 7, Month: 'July', margin: 0, sale: 0 },
		{ id: 8, Month: 'August', margin: 0, sale: 0 },
		{ id: 9, Month: 'September', margin: 0, sale: 0 },
		{ id: 10, Month: 'October', margin: 0, sale: 0 },
		{ id: 11, Month: 'November', margin: 0, sale: 0 },
		{ id: 12, Month: 'December', margin: 0, sale: 0 },
	];

	sales.map(sale => {
		const month = sale.Month;

		const index = records.findIndex(r => r.Month === month);
		if (index > -1) {
			records[index].margin = sale.margin;
			records[index].sale = sale.sale;
		}
	});

	return records;
};
