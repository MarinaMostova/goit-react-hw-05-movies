import { useEffect, useState } from 'react';
import { getMovieTrending } from 'services/movie-api';
import Loader from 'components/Loader';
import MoviesList from 'components/MoviesList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    setIsloading(true);
    try {
      const result = await getMovieTrending();
      setMovies([...result]);
    } catch (err) {
      setError(err);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {movies.length > 0 && <MoviesList movies={movies} />}
      {error && <p>Oops! Something went wrong! Please try again later</p>}
    </>
  );
};

export default HomePage;
