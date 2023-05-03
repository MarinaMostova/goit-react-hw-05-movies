import { useEffect, useState } from 'react';
import { searchMovie } from 'services/movie-api';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoviesList from 'components/MoviesList';
import Loader from 'components/Loader';
import SearchBar from 'components/SearchBar';

const Movies = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    if (movieName === null) {
      return;
    }
    getMovies(movieName);
  }, [movieName]);

  const getMovies = async searchQuery => {
    setMovies([]);
    setIsloading(true);
    try {
      const result = await searchMovie(searchQuery);
      if (result.length === 0) {
        return toast(
          ' Sorry, there are no  movies matching your search query. Please try again.'
        );
      }
      setMovies([...result]);
    } catch (error) {
      setError(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmit = inputData => {
    const searchQuery = inputData.toLowerCase().trim();

    if (searchQuery === '') {
      toast('🔍 What are you looking for?');
      return setSearchParams({});
    } else if (searchQuery === movieName) {
      toast(`You are already looking at "${movieName}"`);
      return;
    } else {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <>
      <SearchBar query={movieName} handleSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {movies && <MoviesList movies={movies} location={location} />}
      <ToastContainer autoClose={3000} />
      {error && <p>Oops! Something went wrong! Please try again later</p>}
    </>
  );
};

export default Movies;