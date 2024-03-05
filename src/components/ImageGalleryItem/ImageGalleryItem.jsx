import React from 'react';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onSelect }) => {
  return (
    <li className={s.galleryItem} onClick={() => onSelect(image.webformatURL)}>
      <img src={image.webformatURL} alt={image.tags} className={s.image} />
    </li>
  );
};
