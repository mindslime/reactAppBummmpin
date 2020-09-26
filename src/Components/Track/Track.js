import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handlePlayTrack = this.handlePlayTrack.bind(this);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}>-</button>
    } else {
      return (
        <div className="Track-action-buttons">
          <a className="Track-play-button" onClick={this.handlePlayTrack}><i className="material-icons">play_circle_outline</i></a>
          <button className="Track-action" onClick={this.addTrack}>+</button>
        </div>
      )
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  handlePlayTrack() {
    this.props.onToggleTrackPlay(this.props.trackId);
  }

  render() {
		const className = 'Track ' + (this.props.playingNow ? 'playing-now' : '');
    return(
      <div className={className}>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track;