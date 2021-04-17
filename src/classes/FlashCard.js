import { Answer } from './Answer';

const constructAnswers = (answers) => {
  if (!answers) {
    return [];
  }
  const answersList = [];
  for (let i = 0; i < answers.length; i + 1) {
    answersList.push(new Answer(answers[i].answer, answers[i].votes));
  }
  return answersList;
};

export class FlashCard {
  constructor(id, question, answers = []) {
    this.id = id;
    this.question = question;
    this.answers = constructAnswers(answers);
  }
}

export const flashcardConverter = {
  toFirestore(flashcard) {
    return {
      id: flashcard.id,
      question: flashcard.question,
      answers: flashcard.answers,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new FlashCard(snapshot.id, data.question, data.answers);
  },
};
