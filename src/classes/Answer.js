export class Answer {
  constructor(id, answer, votes) {
    this.id = id;
    this.answer = answer;
    this.votes = votes;
  }
}

export const answerConverter = {
  toFirestore(answer) {
    return {
      id: answer.id,
      answer: answer.answer,
      votes: answer.votes,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Answer(snapshot.id, data.answer, data.votes);
  },
};
