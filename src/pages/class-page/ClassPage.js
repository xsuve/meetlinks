import React, { Component } from 'react';

// CSS
import './ClassPage.css';

// Components
import Navbar from './../../components/navbar/Navbar';
import LinkInput from './../../components/link-input/LinkInput';
import Alert from './../../components/alert/Alert';

// Services
import LocalStorageService from './../../services/LocalStorageService';


class ClassPage extends Component {
  constructor() {
    super();

    this.state = {
      classId: null,
      linksNr: 1,
      alert: {
        display: false,
        message: ''
      },
      data: {
        title: '',
        teacher: '',
        image: '',
        link: []
      }
    };

    this.newLinkInput = this.newLinkInput.bind(this);
  }

  componentDidMount() {
    if(this.props.params.classId) {
      this.setState({
        classId: this.props.params.classId,
        data: LocalStorageService.getClass(parseInt(this.props.params.classId))
      });
    }
  }

  newLinkInput() {
    this.setState({ linksNr: this.state.linksNr + 1 });
  }

  updateLinkInput(data) {
    LocalStorageService.updateLinks(this.state.classId, data);
  }

  // Render
  render() {
    return (
      <>
        <Navbar back />

        { this.state.alert.display &&
          <Alert type="success" message={this.state.alert.message} />
        }

        <div className="mt-12">
          <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: 'url("' + this.state.data.image + '")' }}></div>
          <div className="p-5">
            <h6 className="text-white text-base font-light mb-2">{this.state.data.title}</h6>
            <p className="text-gray-400 text-sm font-light">{this.state.data.teacher}</p>
            <div className="mt-7">
              { Array.from({ length: this.state.linksNr }, (element, index) => (
                <LinkInput key={index} data={this.state.data} updateLinkInput={(data) => this.updateLinkInput(data)} />
              ))}
              <div className="border border-gray-700 w-10 h-10 flex items-center justify-center cursor-pointer" onClick={this.newLinkInput}>
                <span className="material-icons-outlined text-base text-gray-400">add</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default ClassPage;
