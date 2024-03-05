import React from 'react';
import s from './Button.module.css';

export const Button = ({ handleLoadMore, loading }) => {
  return (
    <button type="button" onClick={handleLoadMore} className={s.buttonMore}>
      {!loading ? 'Load more' : 'Loading...'}
    </button>
  );
};
