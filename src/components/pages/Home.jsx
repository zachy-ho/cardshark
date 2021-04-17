import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../firebase';
import cardImage from '../../cardImage.jpg';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      topics: [],
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
        });
      });
    });
  }

  render() {
    return (
      <Container>
        <Grid container spacing={4} maxWidth="md">
          {this.state.topics.map((topic) => {
            return (
              <Grid item key={topic.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardActionArea>
                    <CardMedia
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
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
}

export default Home;
