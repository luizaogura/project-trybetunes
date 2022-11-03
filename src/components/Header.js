import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
  };

  async componentDidMount() {
    const userName = await getUser();
    this.setState({ userName });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        { !userName && <Loading /> }
        { userName && (
          <div>
            <p data-testid="header-user-name">
              {userName.name}
            </p>
            <nav>
              <Link to="/search" data-testid="link-to-search">
                <button type="button">Pesquisar</button>
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                <button type="button">Músicas Favoritas</button>
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                <button type="button">Perfil</button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
