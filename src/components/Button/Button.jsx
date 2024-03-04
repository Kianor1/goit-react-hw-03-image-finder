import React from 'react';
import s from './Button.module.css';

export const Button = () => {
  return (
    <button type="button" className={s.buttonMore}>
      Load more...
    </button>
  );
};
