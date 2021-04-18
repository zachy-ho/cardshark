import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import styles from './NavBar.module.scss';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar className={styles.toolbar}>
      <Link className={styles.homeLink} to="/">
        <Typography variant="h4">
          flashkardz
        </Typography>
      </Link>
      <div>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </div>
    </Toolbar>
  </AppBar>
);

export default NavBar;
