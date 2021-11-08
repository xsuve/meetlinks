import React, { Component } from 'react';

// React Router
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import ClassPageWrapper from './pages/class-page/ClassPageWrapper';


class App extends Component {
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
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/class/:classId" element={<ClassPageWrapper />} />
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;
