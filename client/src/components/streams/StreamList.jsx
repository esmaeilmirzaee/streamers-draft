import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    console.log(
      typeof stream.userId,
      stream.userId,
      typeof this.props.currentUserId,
      this.props.currentUserId
    );
    if (
      typeof stream.userId != 'undefined' &&
      typeof this.props.currentUserId != null &&
      stream.userId == this.props.currentUserId
    ) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <button className='ui button negative'>Delete</button>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className='item' key={stream.id}>
          {this.renderAdmin(stream)}
          <i className='large middle aligned camera icon'></i>
          <div className='content'>
            {stream.title}
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div className='text-right'>
          <Link to='/streams/new'>
            <button className='ui floated right button'>Create</button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <h1>Streams</h1>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
