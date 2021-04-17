import React, { Component } from 'react';
import firebase from './firebase';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      cards: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const cardsRef = firebase.firestore().collection('cards');

    cardsRef.get().then((snapshot) => {
      // console.log(snapshot);
      const newCards = [];
      snapshot.forEach((doc) => {
        newCards.push({
          id: doc.id,
          title: doc.data().title,
        });
        // console.log(doc.id, '=>', doc.data());
      });
      // const newCards = snapshot.val();
      console.log(newCards);
      this.setState({
        cards: newCards,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const cardsRef = firebase.firestore().collection('cards');
    const card = {
      title: this.state.title,
    };

    cardsRef.add(card).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  handleChange(e) {
    console.log('hello');
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <section className="add-item">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" placeholder="What's your title?" onChange={this.handleChange} value={this.state.title} />
            <button>Add Item</button>
          </form>
        </section>
        <section className="display-item">
          <div className="wrapper">
            <ul>
              {this.state.cards.map((card) => {
                return (
                  <li key={card.id}>
                    <h3>{card.title}</h3>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
