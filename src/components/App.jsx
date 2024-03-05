import React, { Component } from 'react';
import { fetchImages } from './services/api';
import Searchbar from './Searchbar/Searchbar';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Modal } from './Modal/Modal.jsx';
import Loader from './Loader/Loader';
import s from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    totalImages: 0,
    query: '',
    page: 1,
    step: 12,
    largeImageURL: '',
    isLoading: false,
    showModal: false,
    error: null,
  };

  async componentDidMount() {
    try {
      const { hits, totalHits } = await fetchImages(
        this.state.page,
        this.state.step,
        this.state.query
      );
      this.setState({ isLoading: true });
      this.setState({ images: hits, totalImages: totalHits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (
        prevState.page !== this.state.page ||
        prevState.query !== this.state.query
      ) {
        const data = await fetchImages(
          this.state.page,
          this.state.step,
          this.state.query
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleEscClose = e => {
    if (e.code === 'Escape' && this.state.showModal) {
      this.closeModal();
    }
  };

  openModal = largeImageURL => {
    window.addEventListener('keydown', this.handleEscClose);
    this.setState({ largeImageURL, showModal: true });
  };

  closeModal = () => {
    window.removeEventListener('keydown', this.handleEscClose);
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;
    return (
      <div className={s.galleryWrapper}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onSelect={this.openModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <Button handleLoadMore={this.handleLoadMore} loading={isLoading} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
