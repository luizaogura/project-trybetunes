import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Route exact path="/" Component={ Login } />
          <Route exact path="/search" Component={ Search } />
          <Route exact path="/album/:id" Component={ Album } />
          <Route exact path="/favorites" Component={ Favorites } />
          <Route exact path="/profile" Component={ Profile } />
          <Route exact path="/profile/edit" Component={ ProfileEdit } />
          <Route exact path="*" Component={ NotFound } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
