import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import styles from './PrivateRoute.module.scss';

const PrivateRoute = ({ exact, component, path }) => (
  <>
    <NavBar />
    <div className={styles.pageContent}>
      <Route exact={exact} component={component} path={path} />
    </div>
  </>
);

export default PrivateRoute;
