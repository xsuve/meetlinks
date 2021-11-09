import React, { Component } from 'react';

// CSS
import './LinkInput.css';

// Components


class LinkInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index,
      link: this.props.link
    };

    this.saveInputIndex = this.saveInputIndex.bind(this);
    this.saveInputLink = this.saveInputLink.bind(this);
    this.saveInput = this.saveInput.bind(this);
  }

  componentDidMount() {

  }

  saveInputIndex(event) {
    this.setState({ index: event.target.value.toUpperCase() });
  }

  saveInputLink(event) {
    this.setState({ link: event.target.value });
  }

  saveInput() {
    if(this.state.index !== '' && this.state.link !== '') {
      this.props.updateLinkInput({
        index: this.state.index,
        link: this.state.link
      });

      this.setState({
        index: '',
        link: ''
      });
    }
  }

  // Render
  render() {
    return (
      <div className="mb-5">
        <label className="text-gray-400 text-xs font-light block mb-2">Link</label>
        <div className="flex">
          <div className={`w-10 h-10 bg-gray-800 border-r border-gray-700 text-white text-center text-sm flex flex-shrink-0 items-center justify-center`}>
            <input type="text" placeholder="C" maxLength="1" className="bg-gray-800 text-white text-xs font-light text-center uppercase w-full h-full p-2 outline-none" value={this.state.index} onChange={(e) => this.saveInputIndex(e)} />
          </div>
          <input type="text" placeholder="ex. https://meet.google.com/" className="bg-gray-800 text-white text-xs font-light w-full h-10 px-3 outline-none" value={this.state.link} onChange={(e) => this.saveInputLink(e)} />
          { (this.state.index !== '' && this.state.link !== '' && ((this.state.index !== this.props.index) || (this.state.link !== this.props.link))) &&
            <div className={`w-10 h-10 bg-green-600 border-l border-gray-700 text-white text-center text-sm flex flex-shrink-0 items-center justify-center cursor-pointer`} onClick={() => this.saveInput()}>
              <span className="material-icons-outlined text-base text-white">check</span>
            </div>
          }
        </div>
      </div>
    );
  }

}

export default LinkInput;
