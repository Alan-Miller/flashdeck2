import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  getCardsAndDecks,
  // getCardsInDecks,
  setNewCards,
  setNewDeck,
  putCardsInDeck,
  deleteDeck,
  deleteCards
} from '../ducks/reducer';

class Manage extends React.Component {

  constructor() {
    super()

    this.state = {
      front: '',
      back: '',
      deckName: '',
      selectedCardIDs: [],
      selectedDeck: {}
    }

    this.handleInput = this.handleInput.bind(this)
    this.makeCard = this.makeCard.bind(this)
    this.makeDeck = this.makeDeck.bind(this)
    this.addCardsToDeck = this.addCardsToDeck.bind(this)
  }

  componentWillMount() {
    this.props.getCardsAndDecks()
    // this.props.getCardsInDecks()
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
    this.setState({ deckName: '' })
  }

  batchMakeCards() {
    this.props.setNewCards(this.state.batchNewCards)
  }

  removeCard(cardIDs) {
    this.props.deleteCards(cardIDs)
  }

  removeDeck(e, deckID) {
    e.stopPropagation()
    this.props.deleteDeck(deckID)
  }

  selectCard(cardID) {
    const { selectedCardIDs } = this.state
    const selectedCardIndex = selectedCardIDs.findIndex(id => id === cardID)

    if (selectedCardIndex === -1) {
      this.setState({ selectedCardIDs: [...selectedCardIDs, cardID] })
    }
    else {
      const selectedCardIDsCopy = selectedCardIDs.slice()
      selectedCardIDsCopy.splice(selectedCardIndex, 1)
      this.setState({ selectedCardIDs: selectedCardIDsCopy })
    }
  }

  selectDeck(deck) {
    this.setState({ selectedDeck: deck })
  }

  addCardsToDeck() {
    if (!this.state.selectedCardIDs.length) return
    else this.props.putCardsInDeck(this.state.selectedCardIDs, this.state.selectedDeck.deck_id)
  }

  render() {

    const selectedStyles = cardID => {
      return (
        this.state.selectedCardIDs.some(id => id === cardID) ?
          { color: 'red' }
          : null
      )
    }

    const cards = (
      _.uniqBy(this.props.cardsAndDecks, 'card_id')
        .filter(card => !!card.card_id)
        .map(card => (
          <div
            key={card.card_id}
            style={selectedStyles(card.card_id)}
            onClick={() => this.selectCard(card.card_id)}
          >
            {card.front} {card.back}
            <span onClick={() => this.removeCard([card.card_id])}> x </span>
          </div>
        ))
    )

    const decks = (
      _.uniqBy(this.props.cardsAndDecks, 'deck_id')
        .filter(deck => !!deck.deck_id)
        .map(deck => (
          <div key={deck.deck_id} onClick={() => this.selectDeck(deck)}>
            {deck.deck_name}
            <span onClick={e => this.removeDeck(e, deck.deck_id)}> x </span>
          </div>
        ))
    )

    const selectedDeckName = this.state.selectedDeck.deck_name && this.state.selectedDeck.deck_name

    const selectedDeckCards = this.props.cardsAndDecks
      .filter(card => card.deck_id === this.state.selectedDeck.deck_id && card.card_id)
      .map(card => (
        <div key={card.card_id}>
          {card.front} {card.back}
        </div>
      ))

    return (
      <div className="Manage">

        <h2>Manage</h2>

        <h4>Make a card</h4>
        <input value={this.state.front} name="front" placeholder="front" type="text" onChange={this.handleInput} />
        <input value={this.state.back} name="back" placeholder="back" type="text" onChange={this.handleInput} />
        <button onClick={this.makeCard}>Make card</button>

        <h3>Cards</h3>
        {cards}

        <h4>Make a deck</h4>
        <input value={this.state.deckName} name="deckName" placeholder="deck name" type="text" onChange={this.handleInput} />
        <button onClick={this.makeDeck}>Make deck</button>

        <h3>Decks</h3>
        {decks}

        <h3 onClick={this.addCardsToDeck}>{selectedDeckName}</h3>
        {selectedDeckCards}

      </div>
    )
  }
}

const actionCreators = {
  getCardsAndDecks,
  // getCardsInDecks,
  setNewCards,
  setNewDeck,
  putCardsInDeck,
  deleteDeck,
  deleteCards
};

export default connect(state => state, actionCreators)(Manage);