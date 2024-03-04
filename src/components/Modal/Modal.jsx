import React from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, onClose }) => {
  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};
