import moment from 'moment';

export const setWeeklySale = (state, records) => (state.weeklySale = records);

export const setMonthlySale = (state, records) => (state.monthlySale = records);

export const setQuarterlySale = (state, records) =>
	(state.quarterlySale = records);

export const setYearlySale = (state, records) => (state.yearlySale = records);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

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
	for (
		const m = moment(startDate);
		m.diff(currentDate, 'days') <= 0;
		m.add(1, 'days')
	) {
		const data = {
			margin: 0,
			// day: `${m.format('ddd')} (${m.format('D/MMM')})`,
			day: `${m.format('D')}`,
			date_at: m.format('Y-MM-D'),
		};

		records.push(data);
	}

	comingRecords.map(data => {
		const date_at = data.date_at;

		const index = records.findIndex(r => r.date_at === date_at);
		if (index > -1) {
			records[index].margin = data.margin;
		}
	});

	return records;
};
