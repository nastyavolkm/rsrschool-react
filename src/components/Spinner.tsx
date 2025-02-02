import React from 'react';
import './Spinner.css';

class Spinner extends React.Component<object, object> {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default Spinner;
