import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/movie-api';
import css from './Reviews.module.css';
import Loader from 'components/Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [noReviews, setNoReviews] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const getRewies = async id => {
    setIsloading(true);
    try {
      const data = await getMovieReviews(id);
      data.length === 0 ? setNoReviews(true) : setReviews(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getRewies(movieId);
  }, [movieId]);

  return (
    <>
      <ul className={css.reviews__list}>
        {reviews.map(({ id, author, content }) => {
          return (
            <li key={id} className={css.reviews__item}>
              <h3 className={css.reviews__title}>Author: {author}</h3>
              <p className={css.reviews__text}>{content}</p>
            </li>
          );
        })}
      </ul>

      {isLoading && <Loader />}
      {noReviews && (
        <p className={css.reviews__mes}>
          We don't have any reviews for this movie
        </p>
      )}
      {error && <p>Oops! Something went wrong! Please try again later</p>}
    </>
  );
};

export default Reviews;
