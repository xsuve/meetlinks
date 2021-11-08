import React, { Component } from 'react';

// CSS
import './Alert.css';

// Components


class Alert extends Component {
  constructor() {
    super();

    this.state = {
      display: false
    };
  }

  componentDidMount() {
    this.setState({ display: true });
    setTimeout(() => {
      this.setState({ display: false });
    }, 3000);
  }

  // Render
  render() {
    return (
      <div className={`h-10 z-90 fixed bottom-4 left-4 right-4 ${this.state.display ? '' : 'hidden'} ${this.props.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
        <div className="h-full text-white font-light text-xs flex items-center px-4">{this.props.message}</div>
      </div>
    );
  }

}

export default Alert;
