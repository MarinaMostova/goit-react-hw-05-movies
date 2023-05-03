import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/movie-api';
import MovieDetails from 'components/MovieDetails';
import ButtonBack from 'components/ButtonBack';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const location = useLocation();

  const backLinkHref = location.state?.from ?? '/';

  const getMovie = async id => {
    try {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getMovie(movieId);
  }, [movieId]);

  return (
    <>
      <ButtonBack location={backLinkHref} />
      <MovieDetails movie={movie} />
      {error && <p>Oops! Something went wrong! Please try again later</p>}
    </>
  );
};
export default MovieDetailsPage;
