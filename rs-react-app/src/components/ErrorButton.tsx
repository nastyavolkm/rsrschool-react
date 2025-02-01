import React from 'react';
import './ErrorButton.css';

type ErrorButtonState = {
  hasError: boolean;
};

class ErrorButton extends React.Component<{}, ErrorButtonState> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  triggerError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Manually triggered error!');
    }

    return (
      <button className="error-button" onClick={this.triggerError}>
        Click me to throw an error
      </button>
    );
  }
}

export default ErrorButton;
