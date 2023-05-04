import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/movie-api';
import css from './Cast.module.css';
import ImageNotFound from 'images/ImageNotFound.jpg';
import Loader from 'components/Loader';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [noCast, setNoCast] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const getCast = async id => {
    setIsloading(true);
    try {
      const data = await getMovieCast(id);
      data.length === 0 ? setNoCast(true) : setCast(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getCast(movieId);
  }, [movieId]);

  return (
    <>
      <ul className={css.cast__list}>
        {cast?.map(({ cast_id, character, name, profile_path }) => {
          return (
            <li key={cast_id} className={css.cast__item}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                    : ImageNotFound
                }
                alt={name}
              />
              <p className={css.cast__name}>{name}</p>
              <p className={css.cast__character}>Character: {character}</p>
            </li>
          );
        })}
      </ul>
      {isLoading && <Loader />}
      {error && <p>Oops! Something went wrong! Please try again later</p>}
      {noCast && (
        <p className={css.cast__mes}>
          We have no information about the cast of this movie.
        </p>
      )}
    </>
  );
};

export default Cast;
