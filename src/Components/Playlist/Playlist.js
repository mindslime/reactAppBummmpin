import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist (type to change)'} onChange={this.handleNameChange} />
        <TrackList 
          tracks={this.props.playlistTracks} 
          onRemove={this.props.onRemove} 
          isRemoval={true}
          onToggleTrackPlay={this.props.onToggleTrackPlay} 
          />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist;