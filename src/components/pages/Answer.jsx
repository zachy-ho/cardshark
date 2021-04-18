import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from '../../firebase';

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      topicId: '',
      card_id: '',
      answers: [],
      card: {},
      isCardLoaded: false,
      isAnswerLoaded: false,
    };
  }

  componentDidMount() {
    const cardId = this.props.match.params.id;
    const topicId = this.props.match.params.topic_id;
    this.setState({
      card_id: cardId,
      topic_id: topicId,
    });
    const cardsRef = firebase.firestore().collection('topics/' + topicId + '/cards').doc(cardId);
    cardsRef.get().then((val) => {
      this.setState({
        isCardLoaded: true,
        card: val.data(),
      });
    });
    const answerRef = firebase.firestore().collection('topics/' + topicId + '/cards/' + cardId + '/answers');
    answerRef.get().then((snapshot) => {
      const newAnswers = [];
      snapshot.forEach((doc) => {
        newAnswers.push({
          id: doc.id,
          answer: doc.data().answer,
          votes: doc.data().votes,
        });
        this.setState({
          isAnswerLoaded: true,
          answers: newAnswers,
        });
      });
    });
  }

  handleVoteUp(answer, votes) {
    const batch = firebase.firestore().batch();
    const answerRef = firebase.firestore().collection('topics/' + this.state.topic_id + '/cards/' + this.state.card_id + '/answers').doc(answer.id);
    const newVote = votes + 1;
    batch.update(answerRef, { votes: newVote });
    batch.commit().then(() => {
      const index = this.state.answers.indexOf(answer);
      const newAnswers = this.state.answers;
      newAnswers[index].votes = votes + 1;
      this.setState({
        answers: newAnswers,
      });
    });
  }

  handleVoteDown(answer, votes) {
    const batch = firebase.firestore().batch();
    const answerRef = firebase.firestore().collection('topics/' + this.state.topic_id + '/cards/' + this.state.card_id + '/answers').doc(answer.id);
    const newVote = votes - 1;
    batch.update(answerRef, { votes: newVote });
    batch.commit().then(() => {
      const index = this.state.answers.indexOf(answer);
      const newAnswers = this.state.answers;
      if (votes > 0) {
        newAnswers[index].votes = votes - 1;
      }
      this.setState({
        answers: newAnswers,
      });
    });
  }

  content() {
    return (
      <Container>
        <section>
          <Typography variant="h2" component="h1" gutterBottom>
            Answers
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {this.state.card.question}
          </Typography>
        </section>
        <section className="display-item">
          <div className="wrapper">
            <ul>
              {this.state.answers.map((answer) => {
                return (
                  <Card key={answer.id}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {answer.answer}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {answer.votes}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => this.handleVoteUp(answer, answer.votes)}>Vote Up</Button>
                    </CardActions>
                    <CardActions>
                      <Button size="small" onClick={() => this.handleVoteDown(answer, answer.votes)}>Vote Down</Button>
                    </CardActions>
                  </Card>
                );
              })}
            </ul>
          </div>
        </section>
      </Container>
    );
  }

  render() {
    if (this.state.isAnswerLoaded && this.state.isCardLoaded) {
      return this.content();
    }
    return (
      <Container><CircularProgress /></Container>
    );
  }
}

export default Answer;
