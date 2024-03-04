import React, { Component } from 'react';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div>
        <header className={s.searchBar}>
          <form className={s.form} onSubmit={this.handleSubmit}>
            <input
              className={s.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
              value={this.state.query}
            />
            <button type="submit" className={s.button}>
              <span className={s.buttonLabel}>Search</span>
            </button>
          </form>
        </header>
      </div>
    );
  }
}
