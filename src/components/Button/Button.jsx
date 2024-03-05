import React from 'react';
import s from './Button.module.css';

export const Button = loading => {
  return (
    <button type="button" className={s.buttonMore}>
      {loading ? 'Load more' : 'Loading...'}
    </button>
  );
};
