import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MoviesList.module.css';
import ImageNotFound from 'images/ImageNotFound.jpg';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, original_title, title, poster_path }) => {
        return (
          <li className={css.item} key={id}>
            <NavLink
              className={css.item__link}
              to={`/movies/${id}`}
              state={{ from: location }}
            >
              <img
                className={css.item__image}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                    : ImageNotFound
                }
                alt={original_title || title}
              />
              <p className={css.item__text}> {original_title || title}</p>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string,
      title: PropTypes.string,
      poster_path: PropTypes.string,
    }).isRequired
  ),
};
export default MoviesList;
