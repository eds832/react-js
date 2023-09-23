const getMovieDuration = (duration: number) => {
	const hh = Math.floor(duration / 60);
	const mm = duration % 60;
	const mmString = mm > 0 ? mm + 'min' : '';
	const hhString = hh > 0 ? hh + 'h ' : '';
	return hhString + mmString;
};

export default getMovieDuration;
