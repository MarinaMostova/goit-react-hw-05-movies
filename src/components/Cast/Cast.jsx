import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/movie-api';
import css from './Cast.module.css';
import ImageNotFound from 'images/ImageNotFound.jpg';
import Loader from 'components/Loader';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState('');

  const getCast = async id => {
    try {
      const data = await getMovieCast(id);
      setCast(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getCast(movieId);
  }, [movieId]);

  return (
    <>
      <ul className={css.cast__list}>
        {cast?.map(({ id, character, name, profile_path }) => {
          return (
            <li key={id} className={css.cast__item}>
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
      {!cast && <Loader />}
      {error && <p>Oops! Something went wrong! Please try again later</p>}
    </>
  );
};

export default Cast;
