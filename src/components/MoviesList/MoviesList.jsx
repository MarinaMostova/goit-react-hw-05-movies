import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MoviesList.module.css';
import ImageNotFound from 'images/ImageNotFound.jpg';

const MoviesList = ({ movies, location }) => {
  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => {
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
                alt={title}
              />
              <p className={css.item__text}> {title}</p>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

MoviesList.propTypes = {
  location: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    }).isRequired
  ),
};
export default MoviesList;
