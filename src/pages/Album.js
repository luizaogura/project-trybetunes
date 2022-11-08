import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumName: '',
    artistName: '',
    albumArt: '',
    musicArray: [],
    favMusicArray: [],
    loading: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.setState({ loading: true,
    }, async () => {
      const musicSelected = await getMusics(id);
      const filterMusic = musicSelected
        .filter((musica) => musica.trackName);
      const totalMusicsFav = await getFavoriteSongs();
      this.setState({
        musicArray: filterMusic,
        favMusicArray: totalMusicsFav,
        albumName: musicSelected[0].collectionName,
        artistName: musicSelected[0].artistName,
        albumArt: musicSelected[0].artworkUrl100,
        loading: false,
      });
    });
  }

  addFavMusic = (songID) => {
    const { musicArray } = this.state;
    this.setState({ loading: true,
    }, async () => {
      const favMusicSelected = musicArray
        .find((song) => song.trackId === songID);
      favMusicSelected.checked = true;
      await addSong(favMusicSelected);
      this.setState((prevState) => ({
        loading: false,
        favMusicArray: [...prevState.favMusicArray, favMusicSelected],
      }));
    });
  };

  render() {
    const {
      albumName,
      artistName,
      albumArt,
      musicArray,
      favMusicArray,
      loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<Loading />) : (
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
                  trackId={ song.trackId }
                  songInfo={ song }
                  addFavMusic={ this.addFavMusic }
                  checked={ favMusicArray
                    .some((favorite) => favorite.trackId === song.trackId) }
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
