import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './ButtonBack.module.css';

const ButtonBack = ({ location }) => {
  return (
    <Link className={css.button__back} to={location}>
      Go back
    </Link>
  );
};

ButtonBack.propTypes = {
  location: PropTypes.string,
};

export default ButtonBack;
