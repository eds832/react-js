import React from 'react';
import { useRouter } from 'next/router';
import { encode } from 'querystring-es3';

const useQuery = () => {
	const { query } = useRouter();
	return React.useMemo(() => new URLSearchParams(encode(query)), [query]);
};

export default useQuery;
