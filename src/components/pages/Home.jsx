import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from '../../firebase';
import cardImage from '../../cardImage.jpg';
import styles from './Home.module.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      topics: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    const topicRef = firebase.firestore().collection('topics');
    topicRef.get().then((snapshot) => {
      const newTopics = [];
      snapshot.forEach((doc) => {
        newTopics.push({
          id: doc.id,
          title: doc.data().title,
        });
        this.setState({
          topics: newTopics,
          isLoaded: true,
        });
      });
    });
  }

  content() {
    return (
      <div className={styles.paddedWrapper}>
        <Container>
          <Typography variant="h2" gutterBottom className={styles.headTitle}>
            Topics
          </Typography>
          <Grid container spacing={4} maxWidth="md">
            {this.state.topics.map((topic) => {
              return (
                <Grid item key={topic.id} xs={12} sm={4} md={3}>
                  <Link
                    to={{
                      pathname: `/topics/${topic.id}`,
                      state: { topicTitle: topic.title },
                    }}
                  >
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image={cardImage}
                          title="Image title"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {topic.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }

  render() {
    if (this.state.isLoaded) {
      return this.content();
    }
    return (
      <Container><CircularProgress /></Container>
    );
  }
}

export default Home;
