# Integrating Redux with React

1. npm install react react-redux
2. create `actions/index.jsx`
3. create `reducers/index.jsx`

> **src/reducers/index.jsx**

```javascript
import { combineReducers } from 'redux';

export default combineReducers({
  replaceME: () => 5,
});
```

> **src/index.jsx**

```javascript
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

> **src/actions/index.jsx**

```javascript
export const signIn = () => {
  return {
    type: 'SIGN_IN',
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};
```

> **src/components/GoogleAuth.jsx**

```javascript
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn == null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className='ui google button'>
          <i className='google icon'></i>
          Sign out
        </button>
      );
    } else {
      return (
        <button className='ui google button'>
          <i className='google icon'></i>
          Sign In
        </button>
      );
    }
  }

  render() {
    return <>{this.renderAuthButton()}</>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
```

> **src/reducers/authReducer.jsx**

```javascript
const INITIAL_STATE = {
  isSignedIn:null
}

export default (state=INITIAL_STATE, action) {
  if (action.type == 'SIGN_IN') {
    return {...state, isSignedIn: true};
  } else if (action.type == 'SIGN_OUT') {
    return {...state, isSignedIn: false};
  }

  return state;
}
```

> **src/reducers/index.jsx**

```javascript
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
});
```

> In order to prevent typo-related errors, create `src/actions/types.jsx` then

```javascript
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
```

and then import them as follow and use the variables instead of the string characters.

```javascript
import { SIGN_IN, SIGN_OUT } from 'path/to/types.jsx';
```

_NOTE_: to save the current user's id
`gapi.auth2.getAuthInstance().currentUser.get().getId()`

`this.auth.currentUser.get().getId()`

> **src/actions/index.jsx**

```javascript
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};
```

> **src/components/GoogleAuth.jsx**

```javascript
onAuthChange = (isSignedIn) => {
  if (isSignedIn) {
    this.props.signIn(this.auth.currentUser.get().getId());
  } else {
    this.props.signOut();
  }
};
```

> **src/reducers/authReducer.jsx**

```javascript
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  if (action.type == SIGN_IN) {
    return { ...state, isSignedIn: true, userId: action.payload };
  } else if (action.type == SIGN_OUT) {
    return { ...state, isSignedIn: false, userId: null };
  }
  return state;
};
```

# Redux devtools

> **src/index.jsx**

```javascript
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));
```

> Save all data in Redux store between refreshes of the page

```javascript
localhost:3000?debug_session=<some_string>
```
