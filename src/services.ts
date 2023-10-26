export let abortController = null;

export const getMovies = async (search: string, filter: string) => {
	abortController = new AbortController();
	const response = await fetch(
		`http://localhost:4000/movies?search=${search}&searchBy=title&filter=${
			filter === 'All' ? '' : filter
		}&limit=50`,
		{
			method: 'GET',
			signal: abortController.signal,
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
			},
		}
	);
	if (response.ok) {
		const data = await response.json();
		abortController = null;
		return data.data;
	} else {
		return [];
	}
};
