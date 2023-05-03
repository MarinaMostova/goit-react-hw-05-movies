import { useEffect, useState } from 'react';
import { getMovieTrending } from 'services/movie-api';
import Loader from 'components/Loader';
import MoviesList from 'components/MoviesList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      getMovieTrending().then(data => {
        setMovies([...data]);
      });
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies.length === 0 && <Loader />}
      {movies.length > 0 && <MoviesList movies={movies} />}
      {error && <p>Oops! Something went wrong! Please try again later</p>}
    </>
  );
};

export default HomePage;
