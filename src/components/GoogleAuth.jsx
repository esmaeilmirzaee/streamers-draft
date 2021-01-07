import React from 'react';

import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '383999053407-8u727o8ame09akf8mc6qfflb79bspjiq.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderOnAuthChangeButton = () => {
    if (this.props.isSignedIn === null) {
      return (
        <button className='ui icon button'>
          <i className='google icon'></i>
          Sign Up
        </button>
      );
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className='ui icon button'>
          <i className='google icon'></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className='ui icon button'>
          <i className='google icon'></i>
          Sign In
        </button>
      );
    }
  };

  onAuthChange = (isSignedIn) => {
    console.log(this.props.userId);
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  render() {
    return <>{this.renderOnAuthChangeButton()}</>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
