import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    albumName: '',
    artistName: '',
    albumArt: '',
    musicArray: [],
    loading: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.setState({
      loading: true,
    }, async () => {
      const musicSelected = await getMusics(id);
      this.setState({
        musicArray: musicSelected,
        albumName: musicSelected[0].collectionName,
        artistName: musicSelected[0].artistName,
        albumArt: musicSelected[0].artworkUrl100,
        loading: false,
      });
    });
  }

  render() {
    const {
      albumName,
      artistName,
      albumArt,
      musicArray,
      loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <div className="album-info-container">
              <img src={ albumArt } alt={ albumName } />
              <p data-testid="album-name">{ albumName }</p>
              <p data-testid="artist-name">{ artistName }</p>
            </div>
            <div className="music-list-container">
              { musicArray.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Album;
