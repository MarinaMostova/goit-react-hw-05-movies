import { NavLink, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieDetails.module.css';
import ImageNotFound from 'images/ImageNotFound.jpg';

const MovieDetails = ({ movie }) => {
  const {
    original_title,
    release_date,
    vote_average,
    overview,
    genres,
    poster_path,
  } = movie;

  return (
    <>
      <div className={css.details__container}>
        <img
          className={css.details__image}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300/${poster_path}`
              : ImageNotFound
          }
          alt={original_title}
        />

        <div className={css.details__info}>
          <h2 className={css.details__title}>
            {original_title} ({release_date})
          </h2>
          <p className={css.details__text}>User Score: {vote_average}</p>
          <h3 className={css.details__chapter}>Overview</h3>
          <p className={css.details__text}>{overview}</p>
          <h3 className={css.details__chapter}>Genres</h3>
          <p className={css.details__text}>
            {!genres
              ? 'Not found genres'
              : genres.map(genre => genre?.name).join(', ')}
          </p>
        </div>
      </div>

      <div className={css.info}>
        <h3 className={css.details__chapter}>Additional information</h3>
        <ul className={css.info__list}>
          <li className={css.info__item}>
            <NavLink className={css.info__link} to="cast">
              Cast
            </NavLink>
          </li>
          <li className={css.info__item}>
            <NavLink className={css.info__link} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    original_title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    poster_path: PropTypes.string,
  }).isRequired,
};

export default MovieDetails;
