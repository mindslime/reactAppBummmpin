import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Player from '../Player/Player';

import './App.css';
import TrackList from '../TrackList/TrackList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [],
      currentTrackId: null
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.playerPreview = this.playerPreview.bind(this);
  }


  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist', 
        playlistTracks: []
      })
    }) 
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(searchResult => {
      this.setState({searchResults: searchResult });
    });
  }

  playerPreview(trackId) {
    const checkTrack = track => {
      if (track.playingNow) {
        track.playingNow = false;
      }
      if (track.id === trackId) {
        track.playingNow = true;
      }
      return track;
    };
    let results = this.state.searchResults.map(checkTrack);
    let playlistTracks = this.state.playlistTracks.map(checkTrack);

    this.setState({
      searchResult: results,
      playlistTracks: playlistTracks,
      currentTrackId: trackId
    });
  }

  render() {
    return (
      <div>
        <h1>Bu<span className="highlight">mmm</span>pin'</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <Player currentTrackId={this.state.currentTrackId} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              onToggleTrackPlay={this.playerPreview}
            /> 
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist} 
              onToggleTrackPlay={this.playerPreview}
            />
          </div>
        </div>
      </div> 
    )
  };

  componentDidMount() {
    window.addEventListener('load', Spotify.search(''));
  }
}

export default App;
