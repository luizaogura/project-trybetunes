import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, checked, addFavMusic } = this.props;
    return (
      <div data-testid="page-music-card">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            name="check-fav"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => addFavMusic(trackId) }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  checked: false,
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addFavMusic: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

export default MusicCard;
