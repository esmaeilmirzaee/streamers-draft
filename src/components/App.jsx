import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';

import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='ui container'>
          <Route path='/' exact component={StreamList} />
          <Route path='/streams/new' component={StreamCreate} />
          <Route path='/streams/edit' component={StreamEdit} />
          <Route path='/streams/show' component={StreamShow} />
          <Route path='/streams/delete' component={StreamDelete} />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
