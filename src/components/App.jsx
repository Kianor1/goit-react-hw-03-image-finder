import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Modal } from './Modal/Modal.jsx';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    isLoading: false,
    showModal: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKeyPress);
  }

  handleEscapeKeyPress = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    const BASE_URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=42111454-a6064c7507ecd0abc8356168a&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    this.fetchImages();
  };

  openModal = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onSelect={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.loadMoreImages} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
