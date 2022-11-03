import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    nameInput: '',
    buttonDisabled: true,
    loading: false,
    loginComplete: false,
  };

  validateSaveButton = () => {
    const { nameInput } = this.state;
    let isValid = false;
    const minLetters = 3;

    if (nameInput.length >= minLetters) {
      isValid = true;
    } else {
      isValid = false;
    }
    this.setState({ buttonDisabled: !isValid });
  };

  onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState(
      { [name]: value },
      () => {
        this.validateSaveButton();
      },
    );
  };

  submitButton = () => {
    this.setState({ loading: true }, async () => {
      const { nameInput } = this.state;
      await createUser({ name: nameInput });
      this.setState({
        loading: false,
        loginComplete: true,
      });
    });
  };

  render() {
    const { nameInput, buttonDisabled, loading, loginComplete } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <p>Login</p>
            <label htmlFor="nameInput">
              Insira seu nome:
              <input
                type="text"
                name="nameInput"
                data-testid="login-name-input"
                value={ nameInput }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.submitButton }
            >
              Entrar
            </button>
          </form>
        )}
        { loginComplete && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
