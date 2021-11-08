import React, { Component } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// Components
import ClassPage from './ClassPage';


const ClassPageWrapper = (props) => {
  const params = useParams();

  return (
    <ClassPage {...props} params={params} />
  );
};

export default ClassPageWrapper;
