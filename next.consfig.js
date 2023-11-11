/** @type {import('next').NextConfig} */

const NextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/movies',
				permanent: true,
			},
		];
	},
};

export default NextConfig;
