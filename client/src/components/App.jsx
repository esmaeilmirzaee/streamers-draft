import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header';

import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';

import history from './history';

const App = () => {
  return (
    <>
      <Router history={history}>
        <Header />
        <div className='ui container'>
          <Route path='/' exact component={StreamList} />
          <Route path='/streams/new' component={StreamCreate} />
          <Route path='/streams/edit/:id' component={StreamEdit} />
          <Route path='/streams/show' component={StreamShow} />
          <Route path='/streams/delete' component={StreamDelete} />
        </div>
      </Router>
    </>
  );
};

export default App;
