import React, { Component } from 'react';

// React Router
import {
  Navigate
} from 'react-router-dom';

// CSS
import './Settings.css';

// Components
import Navbar from './../../components/navbar/Navbar';

// Services
import LocalStorageService from './../../services/LocalStorageService';


class Settings extends Component {
  constructor() {
    super();

    this.state = {
      navigate: false
    };

    this.classRoomCSSClassName = React.createRef();

    this.updateSettings = this.updateSettings.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {
    //
  }

  updateSettings() {
    if(this.classRoomCSSClassName.current.value !== '') {
      LocalStorageService.setConfig({
        classRoomCSSClassName: this.classRoomCSSClassName.current.value
      });
    }
  }

  deleteData() {
    LocalStorageService.deleteData();
    this.setState({
      navigate: true
    });
  }

  // Render
  render() {
    return (
      <>
        <Navbar back settings />

        <div className="mt-12">
          <div className="p-5">
            <h1 className="text-base text-white font-light">Settings</h1>
            <div className="mt-7">
              <div className="mb-5">
                <label className="text-gray-400 text-xs font-light block mb-2">Classroom CSS class name</label>
                <input ref={this.classRoomCSSClassName} type="text" placeholder="ex. gHz6xd" className="bg-gray-800 text-white text-xs font-light w-full h-10 px-4 outline-none" />
              </div>
              <button className="bg-indigo-600 text-white text-xs font-light h-10 px-4 outline-none" onClick={this.updateSettings}>Update</button>

              <button className="bg-gray-800 text-red-600 text-xs font-light h-10 px-4 outline-none absolute bottom-5 left-5 right-5" onClick={this.deleteData}>Delete saved data</button>
            </div>
          </div>
        </div>

        { this.state.navigate && <Navigate to="/" replace={true} /> }
      </>
    );
  }

}

export default Settings;
