import debounce from 'just-debounce-it';
import { useCallback, useState } from 'react';
import './App.css';
import { Movies } from './components/movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

function App() {
	const [sort, setSort] = useState(false);
	const { search, setSearch, error } = useSearch();
	const { movies, getMovies, loading } = useMovies({ search, sort });

	const debouncedGetMovies = useCallback(
		debounce(search => {
			getMovies({ search });
		}, 500),
		[getMovies]
	);

	const handleSort = () => setSort(!sort);

	const handleSubmit = event => {
		event.preventDefault();
		getMovies({ search });
	};

	const handleChange = event => {
		const newSearch = event.target.value;
		setSearch(newSearch);
		debouncedGetMovies(newSearch);
	};

	return (
		<div className='page'>
			<h1>Buscador de películas</h1>
			<header>
				<form className='form' onSubmit={handleSubmit}>
					<input
						style={{
							border: '1px solid transparent',
							borderColor: error ? 'red' : 'transparent',
						}}
						placeholder='Avengers, Matrix, ...'
						onChange={handleChange}
						value={search}
					/>
					<input type='checkbox' onChange={handleSort} checked={sort} />
					<button type='submit'>Buscar</button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</header>
			<main>
				{!error && loading ? (
					<p>Cargando...</p>
				) : (
					!error && <Movies movies={movies} />
				)}
			</main>
		</div>
	);
}

export default App;
