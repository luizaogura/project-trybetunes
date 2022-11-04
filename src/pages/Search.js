import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchInput: '',
    buttonDisabled: true,
    loading: false,
    artistName: '',
    artistArray: [],
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

  submitButton = () => {
    const { searchInput } = this.state;
    this.setState({ loading: true,
    }, async () => {
      const artistSearched = await searchAlbumsAPI(searchInput);

      this.setState({
        artistArray: artistSearched,
        loading: false,
        artistName: searchInput,
        searchInput: '',
        buttonDisabled: true,
      });
    });
  };

  render() {
    const {
      searchInput,
      buttonDisabled,
      loading,
      artistName,
      artistArray } = this.state;
    const nullResult = artistArray.length === 0;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
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
              onClick={ this.submitButton }
            >
              Pesquisar
            </button>
          </form>
        )}

        <p>{`Resultado de álbuns de: ${artistName}`}</p>
        { nullResult ? <p>Nenhum álbum foi encontrado</p> : (
          artistArray.map((result) => (
            <div key={ result.collectionId }>
              <Link
                to={ `/album/${result.collectionId}` }
                data-testid={ `link-to-album-${result.collectionId}` }
              >
                <img src={ result.artworkUrl100 } alt={ result.collectionName } />
                <p>{ result.artistName }</p>
                <p>{ result.collectionName }</p>
              </Link>
            </div>
          ))) }
      </div>
    );
  }
}

export default Search;
