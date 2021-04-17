import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

const Home = () => (
  <Container>
    <Link to="/deck">
      <h1>Hi</h1>
    </Link>

  </Container>
);

export default Home;
