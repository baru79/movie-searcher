import { useEffect, useRef, useState } from 'react';

export const useSearch = () => {
	const [search, setSearch] = useState('');
	const [error, setError] = useState(null);

	const isFirstInput = useRef(true);

	useEffect(() => {
		if (isFirstInput.current) {
			// Not show error on first render
			isFirstInput.current = search === '';
			return;
		}

		if (search === '') {
			setError('No se puede buscar una película vacía');
			return;
		}

		if (search.match(/^\d+$/)) {
			setError('No se puede buscar una película con un numero');
			return;
		}

		if (search.length < 3) {
			setError('La búsqueda debe tener al menos 3 caracteres');
			return;
		}

		setError(null);
	}, [search]);

	return { search, setSearch, error };
};
