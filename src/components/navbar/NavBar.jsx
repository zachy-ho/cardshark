import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        Flashkardz
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NavBar;
