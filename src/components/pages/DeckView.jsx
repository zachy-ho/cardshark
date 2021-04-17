import React, { useState } from 'react';
import FlashCard from '../flashcard/FlashCard';
import styles from './DeckView.module.scss';

const deck = [
  {
    question: 'Why did the chicken cross the road?',
    answer: 'Just cos.',
  },
  {
    question: 'Why did the duck cross the road?',
    answer: 'He wanted to follow the chicken.',
  },
];

const DeckNavigation = () => (
  <h1>
    --- TODO ---
  </h1>
);

const DeckView = () => {
  const [cards, setCards] = useState(deck);

  return (
    <div className={styles.view}>
      <div className={styles.deck}>
        <div className={styles.card}>
          <FlashCard
            question={cards[0].question}
            answer={cards[0].answer}
          />
        </div>
        <DeckNavigation />
      </div>
    </div>
  );
};

export default DeckView;
