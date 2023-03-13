const ListOfMovies = ({ movies }) => (
	<ul className='movies'>
		{movies?.map(movie => (
			<li key={movie.id} className='movie'>
				<h3>{movie.title}</h3>
				<p className='year'>{movie.year}</p>
				<img src={movie.poster} alt={movie.title} />
			</li>
		))}
	</ul>
);

const NoMoviesResults = () => <p>No hay peliculas para esta busqueda</p>;

export const Movies = ({ movies }) => {
	const hasMovies = movies?.length > 0;
	return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
};
