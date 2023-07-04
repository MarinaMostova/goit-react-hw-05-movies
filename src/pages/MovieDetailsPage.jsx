import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/movie-api';
import MovieDetails from 'components/MovieDetails';
import ButtonBack from 'components/ButtonBack';
import Loader from 'components/Loader';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    getMovie(movieId);
  }, [movieId]);

  const getMovie = async id => {
    setIsloading(true);
    try {
      const result = await getMovieDetails(id);
      setMovie(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <ButtonBack location={backLinkHref.current} />
      {isLoading && <Loader />}
      {movie && <MovieDetails movie={movie} />}
      {error && <p> Oops! Something went wrong! Please try again later</p>}
    </>
  );
};
export default MovieDetailsPage;
