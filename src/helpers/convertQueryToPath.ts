import { ParsedUrlQuery } from 'querystring-es3';

const convertQueryToPath = (query: ParsedUrlQuery) => {
	const params = [];
	for (const [key, value] of Object.entries(query)) {
		if (!value || key === 'movieId') continue;
		if (Array.isArray(value)) {
			value.forEach((element) => {
				params.push(`${key}=${encodeURIComponent(element)}`);
			});
		} else {
			params.push(`${key}=${encodeURIComponent(value.toString())}`);
		}
	}
	return params.join('&');
};

export default convertQueryToPath;
