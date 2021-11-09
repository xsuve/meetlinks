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
      alert: {
        display: false,
        message: ''
      },
      data: {
        title: '',
        teacher: '',
        image: '',
        links: []
      }
    };

    this.newLinkInput = this.newLinkInput.bind(this);
  }

  fetchClass(id) {
    this.setState({
      classId: id,
      data: LocalStorageService.getClass(parseInt(id))
    });
  }

  componentDidMount() {
    if(this.props.params.classId) {
      this.fetchClass(this.props.params.classId);
    }
  }

  newLinkInput() {
    this.setState({
      data: {
        ...this.state.data,
        links: [...this.state.data.links, { index: '', link: '' }]
      }
    });
  }

  updateLinkInput(data) {
    LocalStorageService.updateLink(this.state.classId, data);
    this.fetchClass(this.state.classId);
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
              { this.state.data.links.length > 0
                ?
                (
                  this.state.data.links.map((link, index) => (
                    <LinkInput key={index} index={link.index} link={link.link} updateLinkInput={(data) => this.updateLinkInput(data)} />
                  ))
                )
                :
                <LinkInput index="" link="" updateLinkInput={(data) => this.updateLinkInput(data)} />
              }
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
