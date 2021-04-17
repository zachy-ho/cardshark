import React, { useState } from 'react';
import {
  Button, Card, CardContent, CardActions,
} from '@material-ui/core';
import styles from './FlashCard.module.scss';

const sides = {
  FRONT: 0,
  BACK: 1,
};

const FlashCard = ({ question, answer }) => {
  const [currentSide, setCurrentSide] = useState(sides.FRONT);

  const handleBtnClicked = () => {
    setCurrentSide(currentSide === sides.FRONT ? sides.BACK : sides.FRONT);
  };

  const actions = (side) => {
    if (side === sides.FRONT) {
      return (
        <Button
          className={styles.answerBtn}
          onClick={() => handleBtnClicked()}
        >
          Answer
        </Button>
      );
    }

    return (
      <>
        <Button
          onClick={() => handleBtnClicked()}
        >
          Question
        </Button>
        <Button>
          See all answers
        </Button>
      </>
    );
  };

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        {currentSide === sides.FRONT ? question : answer}
      </CardContent>
      <CardActions className={styles.actions}>
        {actions(currentSide)}
      </CardActions>
    </Card>
  );
};

export default FlashCard;