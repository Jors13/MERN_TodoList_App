const getMaterialActualDate = () => {
	const DATE = new Date();
	const year = DATE.getFullYear();
	const monthWithOffSet = DATE.getUTCMonth() + 1;
	const month =
		monthWithOffSet.toString().length < 2 ? `0${monthWithOffSet}` : monthWithOffSet;
	const date =
		DATE.getUTCDate().toString().length < 2 ? `0${DATE.getUTCDate()}` : DATE.getUTCDate();
	const materialDate = `${year}-${month}-${date}`;

	return materialDate;
};

export { getMaterialActualDate };
