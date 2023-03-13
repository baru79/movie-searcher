import { useCallback, useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export const useMovies = ({ search, sort }) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const previousSearch = useRef(search);

	const getMovies = useCallback(async ({ search }) => {
		if (previousSearch.current === search) {
			return;
		}
		try {
			previousSearch.current = search;
			setLoading(true);
			setError(null);
			const newMovies = await searchMovies(search);
			setMovies(newMovies);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}, []);

	const getSortedMovies = () =>
		useMemo(() => {
			const sortedMovies = sort
				? [...movies]?.sort((a, b) => a.title.localeCompare(b.title))
				: movies;
			return sortedMovies;
		}, [sort, movies]);

	return { movies: getSortedMovies(movies), getMovies, loading, error };
};
