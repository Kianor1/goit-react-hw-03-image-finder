import React from 'react';
import s from './Modal.module.css';

export const Modal = ({ largeImageURL, onClose }) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};
