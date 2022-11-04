import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchInput: '',
    buttonDisabled: true,
  };

  validateSearchButton = () => {
    const { searchInput } = this.state;
    let isValid = false;
    const minLetters = 2;

    if (searchInput.length >= minLetters) {
      isValid = true;
    } else {
      isValid = false;
    }
    this.setState({ buttonDisabled: !isValid });
  };

  onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState(
      { [name]: value },
      () => {
        this.validateSearchButton();
      },
    );
  };

  // submitButton = () => {

  // };

  render() {
    const { searchInput, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="searchInput"
            data-testid="search-artist-input"
            value={ searchInput }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            // onClick={ this.submitButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
