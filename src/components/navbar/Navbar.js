import React, { Component } from 'react';

// React Router
import {
  Link
} from 'react-router-dom';

// CSS
import './Navbar.css';

// Components


class Navbar extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    //
  }

  // Render
  render() {
    return (
      <div className="h-12 w-full bg-gray-800 z-80 fixed top-0 left-0 right-0">
        <div className="h-full flex justify-between">
          <div className="flex justify-start">
            { this.props.back &&
              <Link to="/">
                <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                  <span className="material-icons-outlined text-xl text-gray-400">arrow_back</span>
                </div>
              </Link>
            }
          </div>
          <div className="flex justify-end">
            { this.props.settings ?
              <div className="px-4 h-12 flex items-center justify-center cursor-pointer">
                <span className="material-icons-outlined text-xl text-gray-400 mr-2">upload</span>
                <span className="text-gray-400 text-xs font-light">Upload JSON</span>
              </div>
              :
              <>
                <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                  <span className="material-icons-outlined text-xl text-gray-400">search</span>
                </div>
                <Link to="/settings">
                  <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                    <span className="material-icons-outlined text-xl text-gray-400">settings</span>
                  </div>
                </Link>
              </>
            }
          </div>
        </div>
      </div>
    );
  }

}

export default Navbar;
