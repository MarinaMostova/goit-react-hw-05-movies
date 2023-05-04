import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

const SearchBar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit(search);
  };

  return (
    <form className={css.form} onSubmit={handleSubmitForm}>
      <input
        value={search}
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        onChange={handleInputChange}
      />

      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
