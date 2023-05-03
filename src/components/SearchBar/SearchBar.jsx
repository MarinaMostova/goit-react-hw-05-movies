import { useRef } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

const SearchBar = ({ query, handleSubmit }) => {
  const search = useRef();

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit(search.current.value);
  };

  return (
    <form className={css.form} onSubmit={handleSubmitForm}>
      <input
        ref={search}
        defaultValue={query}
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />

      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
