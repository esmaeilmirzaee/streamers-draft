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

# Redux Forma

`npm install --save redux-from`

> **src/reducers/index.jsx**

```javascript
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
```

> **src/components/StreamCreate.jsx**

```javascript
import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (error && touched) {
      return <div className='ui error message'>{error}</div>;
    }
  }

  renderInput({ input, placeholder, meta }) {
    return (
      <div className={meta.error && meta.touched ? 'field error' : 'field'}>
        <input {...input} autoComplete='off' placeholder={placeholder} />
        <>
          {meta.error && meta.touched ? (
            <div className='ui red'>{meta.error}</div>
          ) : (
            ''
          )}
        </>
      </div>
    );
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    const className = true ? 'ui error form ' : 'ui form';
    return (
      <>
        <h1>StreamCreate</h1>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={className}
        >
          <Field
            name='title'
            component={this.renderInput}
            placeholder='Enter a title'
          />
          <Field
            name='description'
            component={this.renderInput}
            placeholder='How the stream could be catagorised?'
          />
          <button className='ui blue button'>Submit</button>
        </form>
      </>
    );
  }
}

const validate = (formValues) => {
  let errors = {};
  if (!formValues.title) {
    errors.title = 'Please enter a valid title';
  }
  if (!formValues.description) {
    errors.description = 'Please enter the appropriate description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);
```

**ERRORS**:

1. _Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined._

2. _Element is undefiend_

**Solution**:

1. be careful, use reference to `renderInput` and do not call it.
   `return <input onChange={formProps.input.onChange} value={formProps.input.value}>`
   could be shorten to
   `return <input {...formProps.input}>`

```javascript
renderInput(formProps) {
  return <input onChange={formProps.input.onChange} value={formProps.input.value}>
}

onSubmit(formValues) {
  console.log(formValues)
}

render() {
  return (
    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
      <Field name='' component={this.renderInput} />
    </form>
  )
}
```

2. Simply put, convert the _simple_ function into an arrow function.

# Sample code

```javascript
// Array-based approach
const streamReducer = (state = [], action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return state.map((stream) => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      });
    default:
      return state;
  }
};
```

```javascript
// Object-based approach version 1
const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};
```

```javascript
// Object-based approach version 2
const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }; // key interpolation
    default:
      return state;
  }
};
```

# Custom history

1. Create `history` file then import it into `App.jsx`. Next, replace `BrowserRouter` with `Router`.
2. Give `history` as a parameter to the `Router` component.
3. Finally, use history inside `src/actions/index.jsx` then add `history.push('/')` to the appropriate place.
   > **src/history.js**

```javascript
import createHistory from 'history/createBrowserHistory';

export default createHistory();
```

> **src/components/App.jsx**

```javascript
import { Router } from 'react-router-dom';
import history from './history';

<Router history={history}></Router>;
```
