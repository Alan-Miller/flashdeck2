import React from 'react';
import { connect } from 'react-redux';
import {
  getCards,
  getDecks,
  setNewCards,
  setNewDeck,
  deleteDeck,
  deleteCards
} from '../ducks/reducer';

class Manage extends React.Component {

  constructor() {
    super()

    this.state = {
      front: '',
      back: '',
      deckName: ''
    }

    this.handleInput = this.handleInput.bind(this)
    this.makeCard = this.makeCard.bind(this)
    this.makeDeck = this.makeDeck.bind(this)
  }

  componentWillMount() {
    this.props.getCards()
    this.props.getDecks()
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  makeCard() {
    const { front, back } = this.state
    if (!front || !back) return
    this.props.setNewCards([{ front, back }])
    this.setState({ front: '', back: '' })
  }

  makeDeck() {
    this.props.setNewDeck(this.state.deckName)
  }

  batchMakeCards() {
    this.props.setNewCards(this.state.batchNewCards)
  }

  removeCard(cardIDs) {
    this.props.deleteCards(cardIDs)
  }

  removeDeck(deckID) {
    this.props.deleteDeck(deckID)
  }

  render() {

    return (
      <div className="Manage">

        <h2>Manage</h2>

        <h3>Make a card</h3>
        <input value={this.state.front} name="front" placeholder="front" type="text" onChange={this.handleInput} />
        <input value={this.state.back} name="back" placeholder="back" type="text" onChange={this.handleInput} />
        <button onClick={this.makeCard}>Make card</button>

        <h3>Cards</h3>
        {this.props.cards.map(card => (
          <div key={card.id}>
            <div>{card.front} {card.back}
              <span onClick={() => this.removeCard([card.id])}> x </span>
            </div>
          </div>
        ))}

        <h3>Make a deck</h3>
        <input name="deckName" placeholder="deck name" type="text" onChange={this.handleInput} />
        <button onClick={this.makeDeck}>Make deck</button>

        <h3>Decks</h3>
        {this.props.decks.map(deck => (
          <div key={deck.id}>
            <div>{deck.deck_name}
              <span onClick={() => this.removeDeck([deck.id])}> x </span>
            </div>
          </div>
        ))}

      </div>
    )
  }
}

const actionCreators = {
  getCards,
  getDecks,
  setNewCards,
  setNewDeck,
  deleteDeck,
  deleteCards
};

export default connect(state => state, actionCreators)(Manage);