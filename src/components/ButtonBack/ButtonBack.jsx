import { Link } from 'react-router-dom';
import css from './ButtonBack.module.css';
import PropTypes from 'prop-types';

const ButtonBack = ({ location }) => {
  return (
    <Link className={css.button__back} to={location}>
      Go back
    </Link>
  );
};

ButtonBack.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ButtonBack;
