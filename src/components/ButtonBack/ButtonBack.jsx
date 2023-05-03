import { Link } from 'react-router-dom';
import css from './ButtonBack.module.css';

const ButtonBack = ({ location }) => {
  return (
    <Link className={css.button__back} to={location}>
      Go back
    </Link>
  );
};

export default ButtonBack;
