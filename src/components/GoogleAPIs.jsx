import React from 'react';

class GoogleApis extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
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
    if (this.state.isSignedIn === null) {
      return (
        <button className='ui icon button'>
          <i className='google icon'></i>
          Sign Up
        </button>
      );
    } else if (this.state.isSignedIn) {
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

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  render() {
    return <>{this.renderOnAuthChangeButton()}</>;
  }
}

export default GoogleApis;
