import React from 'react';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';

export const ImageGallery = ({ images, onSelect }) => {
  return (
    <ul className={s.gallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onSelect={onSelect} />
      ))}
    </ul>
  );
};
