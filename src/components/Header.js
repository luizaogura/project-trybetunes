import React from 'react';
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
          <p data-testid="header-user-name">
            {userName.name}
          </p>
        )}
      </header>
    );
  }
}

export default Header;
