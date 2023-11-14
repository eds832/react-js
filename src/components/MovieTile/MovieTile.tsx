import React, { FC, useContext, useState } from 'react';

import { MovieType } from './../../types/movies/types';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';
import PopupMenu from '../PopupMenu/PopupMenu';
import getReleaseYear from './../../helpers/getReleaseYear';
import { useAppDispatch } from '../../redux/store';
import { moviesActions } from '../../redux/movieSlice';
import { MovieDialogContext } from '../../context/MovieDialogContextProvider';
import { useRouter } from 'next/router';
import convertQueryToPath from '../../helpers/convertQueryToPath';

interface MovieTileProps {
	movie: MovieType;
}

const MovieTile: FC<MovieTileProps> = ({ movie }) => {
	const router = useRouter();
	const { query } = router;
	const dispatch = useAppDispatch();
	const [, setOpenDialog] = useContext(MovieDialogContext);

	const [showPopupMenu, setShowPopupMenu] = useState(false);

	const handleClickThreeDots = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setShowPopupMenu(!showPopupMenu);
	};

	const { id, imageUrl, movieName, releaseDate, genresList } = movie;

	const onEditClicked = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(moviesActions.setMovie(movie));
		setOpenDialog('edit');
		handleClickThreeDots(event);
	};

	const onDeleteClicked = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(moviesActions.setMovie(movie));
		setOpenDialog('delete');
		handleClickThreeDots(event);
	};

	const handleMovieClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(moviesActions.setMovie(movie));
		router.replace({
			pathname: '/movies/[movieId]',
			query: { ...query, movieId: movie.id },
		});
	};

	return (
		<a
			className='movie-tile-link'
			onClick={handleMovieClick}
			data-testid={`movie-tile-${id}-div`}
			href={`/movies/${movie.id}?${convertQueryToPath(query)}`}
		>
			<div className='movie-img'>
				<img
					data-testid={'movie-tile-img-' + id}
					className='movie-img'
					src={imageUrl}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src =
							'https://via.placeholder.com/300x450.png?text=Movie';
					}}
				/>
				{showPopupMenu ? (
					<PopupMenu
						handleClickThreeDots={handleClickThreeDots}
						onEditClicked={onEditClicked}
						onDeleteClicked={onDeleteClicked}
					/>
				) : (
					<Button
						children='⋮'
						onClick={handleClickThreeDots}
						buttonClass='three-dots'
						dataTestid={'three-dots-' + id}
					/>
				)}
			</div>
			<div className='movie-tile-description'>
				<div className='movie-tile-title-div'>
					<Typography
						type={TypographyTypes.MOVIE_TILE_TITLE}
						dataTestid={'movie-tile-movie-id-' + id}
					>
						{movieName}
					</Typography>
				</div>
				<div className='movie-release-year'>
					<Typography
						dataTestid={'movie-tile-release-year-' + id}
						children={getReleaseYear(releaseDate)}
						type={TypographyTypes.MOVIE_TILE_RELEASE_YEAR}
					/>
				</div>
				<Typography
					dataTestid={'movie-tile-genres-' + id}
					type={TypographyTypes.MOVIE_GENRES}
				>
					{genresList.join(', ')}
				</Typography>
			</div>
		</a>
	);
};

export default MovieTile;
