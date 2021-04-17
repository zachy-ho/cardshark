import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import FlashCard from '../flashcard/FlashCard';
import { flashcardConverter } from '../../classes/FlashCard';
import { answerConverter } from '../../classes/Answer';
import firebase from '../../firebase';
import styles from './DeckView.module.scss';

const db = firebase.firestore();

const DeckView = (props) => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(undefined);
  const history = useHistory();

  const topicId = props.match.params.topic_id;

  // Collect flashcards given the topic
  useEffect(() => {
    console.log('hi1');
    const cardsRef = db.collection(`topics/${topicId}/cards`);
    cardsRef.withConverter(flashcardConverter).get().then((snapshot) => {
      const cardObjs = [];
      snapshot.forEach((doc) => {
        cardObjs.push(doc.data());
      });
      setCards(cardObjs);
      setCurrentCardIndex(0);
      return cardObjs;
    }).then((cardObjs) => {
      const updatedCardObjs = [...cardObjs];
      for (let i = 0; i < cardObjs.length; i += 1) {
        if (cardObjs[i].answers.length === 0) {
          const answersRef = db.collection(`topics/${topicId}/cards/${cardObjs[i].id}/answers`);
          answersRef.withConverter(answerConverter).get().then((snapshot) => {
            const answers = [];
            snapshot.forEach((doc) => {
              answers.push(doc.data());
            });
            updatedCardObjs[i].answers = answers;
            setCards([...updatedCardObjs]);
          });
        }
      }
    })
      .then(() => {
        console.log(cards);
      });
  }, []);

  const seeAnswers = () => {
    history.push(`/topic/${topicId}/cards/${cards[currentCardIndex].id}/answers`);
  };

  const displayCards = () => {
    if (cards.length === 0 || currentCardIndex === undefined) {
      return (
        <CircularProgress />
      );
    }
    return (
      <FlashCard
        question={cards[currentCardIndex]?.question}
        answer={cards[currentCardIndex]?.answers[0]?.answer}
        seeAnswers={seeAnswers}
      />
    );
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const deckNavigation = (currentCard, numCards) => (
    <div className={styles.deckNav}>
      <IconButton onClick={() => previousCard()}>
        <ChevronLeft />
      </IconButton>
      <p>
        {`${currentCard + 1} / ${numCards}`}
      </p>
      <IconButton onClick={() => nextCard()}>
        <ChevronRight />
      </IconButton>
    </div>
  );

  return (
    <div className={styles.view}>
      <div className={styles.deck}>
        <div className={styles.card}>
          {displayCards()}
        </div>
        {deckNavigation(currentCardIndex, cards.length)}
      </div>
    </div>
  );
};

export default DeckView;
