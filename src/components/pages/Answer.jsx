import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Avatar,
  List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,
  IconButton, Divider, colors,
} from '@material-ui/core';
import { ThumbUpAltOutlined, ThumbDownAltOutlined } from '@material-ui/icons';

import firebase from '../../firebase';

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      topic_id: '',
      card_id: '',
      answers: [],
      card: {},
    };
  }

  componentDidMount() {
    const cardId = this.props.match.params.id;
    const topicId = this.props.match.params.topic_id;
    this.setState({
      card_id: cardId,
      topic_id: topicId,
    });
    const cardsRef = firebase.firestore().collection(`topics/${topicId}/cards`).doc(cardId);
    cardsRef.get().then((val) => {
      this.setState({
        card: val.data(),
      });
    });
    const answerRef = firebase.firestore().collection(`topics/${topicId}/cards/${cardId}/answers`);
    answerRef.get().then((snapshot) => {
      const newAnswers = [];
      snapshot.forEach((doc) => {
        newAnswers.push({
          id: doc.id,
          answer: doc.data().answer,
          votes: doc.data().votes,
          votedUp: false,
          votedDown: false,
        });
        this.setState({
          answers: newAnswers,
        });
      });
    });
  }

  handleVoteUp(answer, votes) {
    const batch = firebase.firestore().batch();
    const answerRef = firebase.firestore().collection(
      `topics/${this.state.topic_id}/cards/${this.state.card_id}/answers`,
    ).doc(answer.id);

    let newVotes;
    let newVoteUp;
    const newVoteDown = false;
    if (!answer.votedUp) {
      newVotes = votes + 1;
      newVoteUp = true;
      if (answer.votedDown) {
        newVotes += 1;
      }
    } else {
      newVotes = votes - 1;
      newVoteUp = false;
    }
    batch.update(answerRef, { votes: newVotes });
    batch.commit().then(() => {
      const index = this.state.answers.indexOf(answer);
      const newAnswers = [...this.state.answers];
      newAnswers[index].votes = newVotes;
      newAnswers[index].votedUp = newVoteUp;
      newAnswers[index].votedDown = newVoteDown;
      this.setState({
        answers: newAnswers,
      });
    });
  }

  handleVoteDown(answer, votes) {
    const batch = firebase.firestore().batch();
    const answerRef = firebase.firestore().collection(`topics/${this.state.topic_id}/cards/${this.state.card_id}/answers`).doc(answer.id);
    const newVote = votes + 1;

    let newVotes;
    const newVoteUp = false;
    let newVoteDown;
    if (!answer.votedDown) {
      newVotes = votes - 1;
      newVoteDown = true;
      if (answer.votedUp) {
        newVotes -= 1;
      }
    } else {
      newVotes = votes + 1;
      newVoteDown = false;
    }
    batch.update(answerRef, { votes: newVote });
    batch.commit().then(() => {
      const index = this.state.answers.indexOf(answer);
      const newAnswers = [...this.state.answers];
      newAnswers[index].votes = newVotes;
      newAnswers[index].votedUp = newVoteUp;
      newAnswers[index].votedDown = newVoteDown;
      this.setState({
        answers: newAnswers,
      });
    });
  }

  render() {
    return (
      <>
        <Container>
          <Link to={`/topics/${this.state.topic_id}`}>
            <p>
              &lt; back to deck
            </p>
          </Link>
          <section>
            <Typography variant="h2" component="h1" gutterBottom>
              Answers
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {this.state.card.question}
            </Typography>
          </section>
          <List>
            {this.state.answers.map((answer) => {
              return (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Pepega" src="../../assets/pepega.png" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={answer.answer}
                      secondary={`Votes: ${answer.votes}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.handleVoteUp(answer, answer.votes)}>
                        <ThumbUpAltOutlined style={answer.votedUp
                          ? { color: colors.green[500] }
                          : {}}
                        />
                      </IconButton>
                      <IconButton onClick={() => this.handleVoteDown(answer, answer.votes)}>
                        <ThumbDownAltOutlined style={answer.votedDown
                          ? { color: colors.red[500] }
                          : {}}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </>

              );
            })}
          </List>
        </Container>
      </>
    );
  }
}

export default Answer;
