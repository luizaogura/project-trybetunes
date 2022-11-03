import React from 'react';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nameInput: '',
    buttonDisabled: true,
    loading: false,
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
      });
    });
  };

  render() {
    const { nameInput, buttonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <div data-testid="page-login">
              <p>Login</p>
              <div className="login-name">
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
              </div>
              <div className="login-button">
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ buttonDisabled }
                  onClick={ this.submitButton }
                >
                  Entrar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
