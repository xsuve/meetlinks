import React, { Component } from 'react';

// React Router
import {
  Link
} from 'react-router-dom';

// CSS
import './ClassBox.css';

// Components


class ClassBox extends Component {
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
      <Link to={`/class/${this.props.data.classId}`}>
        <div className="bg-gray-800 w-full mb-5 cursor-pointer">
          <div className="h-14 bg-cover bg-center" style={{ backgroundImage: 'url("' + this.props.data.image + '")' }}></div>
          <div className="p-5">
            <h6 className="text-white text-sm font-light">{this.props.data.title.length > 60 ? this.props.data.title.substr(0, 60) + '...' : this.props.data.title}</h6>
            { this.props.data.links.length > 0 ?
              <div className="mt-4 flex flex-row">
                { this.props.data.links.map((link, index) => (
                  <div key={index} className="w-5 h-5 bg-indigo-600 text-center leading-none text-xs text-white flex items-center justify-center mr-4">{link.index}</div>
                ))}
              </div>
              :
              <div className="mt-4 text-xs text-gray-400">No links have been added yet.</div>
            }
          </div>
        </div>
      </Link>
    );
  }

}

export default ClassBox;
