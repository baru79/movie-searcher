import { API_KEY, API_URL } from '../const';

export const searchMovies = async search => {
	if (search === '') return null;
	const url = `${API_URL}?apikey=${API_KEY}&s=${search}`;
	const response = await fetch(url);

	const json = await response.json();
	const movies = json.Search;
	const res = movies?.map(movie => {
		return {
			id: movie.imdbID,
			title: movie.Title,
			year: movie.Year,
			poster: movie.Poster,
		};
	});
	return res;
};
