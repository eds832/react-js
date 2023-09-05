import React from 'react';

import './MovieGrid.css';

const MovieGrid = () => {
	const MOVIES_DATA = Array.from(Array(6).keys()).map((number) => {
		const showNum = number + 1;
		return {
			name: 'Movie ' + showNum,
			src: 'https://via.placeholder.com/300x450.png?text=Movie+' + showNum,
		};
	});

	return (
		<div className='movie-grid'>
			{MOVIES_DATA.map(({ name, src }) => (
				<div key={name}>
					<img src={src} />
					<h2>{name}</h2>
				</div>
			))}
		</div>
	);
};

export default MovieGrid;
