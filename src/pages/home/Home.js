import React, { Component } from 'react';

// CSS
import './Home.css';

// Components
import Navbar from './../../components/navbar/Navbar';
import ClassBox from './../../components/class-box/ClassBox';

// Services
import LocalStorageService from './../../services/LocalStorageService';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      classes: [
        {
          classId: 1,
          title: 'Procesare numerica a semnalelor',
          teacher: 'Neglina Elena',
          image: 'https://lh3.googleusercontent.com/-jMLMNZ4XpFw/YVLeR7msgRI/AAAAAAAAA4Q/vTJN_4DWbUQ9jNtUC8quK8krw-t7HNbIgCMACGAYYCw/s1280/coperta%2Bcmyk%2B300dpi%2Bcopy.jpg',
          links: [
            {
              index: 'C',
              link: ''
            }
          ]
        },
        {
          classId: 2,
          title: 'Simularea si optimizarea arhitecturilor de calcul',
          teacher: 'Adrian Florea',
          image: 'https://gstatic.com/classroom/themes/Honors.jpg',
          links: []
        }
      ]
    };
  }

  componentDidMount() {
    //LocalStorageService.initClasses(this.state.classes);

    this.setState({
      classes: LocalStorageService.getClasses()
    });
  }

  // Render
  render() {
    return (
      <>
        <Navbar />

        <div className="p-5 mt-12">
          { this.state.classes?.length > 0 ?
            this.state.classes.map((_class, index) => (
              <ClassBox key={index} data={_class} />
            ))
            :
            <p className="font-light text-sm text-gray-400">You don't have any classes.</p>
          }
        </div>
      </>
    );
  }

}

export default Home;
