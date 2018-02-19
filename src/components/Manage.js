import React from 'react';
import _ from 'lodash';
import MakeCard from './MakeCard';
import MakeDeck from './MakeDeck';
import CardsFilter from './CardsFilter';
import { connect } from 'react-redux';
import {
  getCardsAndDecks,
  addCardsToDeck,
  removeCardsFromDeck,
  deleteDeck,
  deleteCards
} from '../ducks/reducer';

class Manage extends React.Component {

  constructor() {
    super()

    this.state = {
      selectedDeck: {}
    }

    this.addCardsToDeck = this.addCardsToDeck.bind(this)
    this.removeCards = this.removeCards.bind(this)
  }

  componentWillMount() {
    this.props.getCardsAndDecks()
  }

  removeDeck(e, deckID) {
    e.stopPropagation()
    this.props.deleteDeck(deckID)
  }

  selectDeck(deck) {
    this.setState({ selectedDeck: deck })
  }

  addCardsToDeck() {
    if (!this.props.selectedCardIDs.length) return
    else this.props.addCardsToDeck(this.props.selectedCardIDs, this.state.selectedDeck.deck_id)
  }

  removeCards() {
    this.props.removeCardsFromDeck(this.props.selectedCardIDs, this.state.selectedDeck.deck_id)
  }

  render() {

    const selectedStyles = cardID => {
      return (
        this.props.selectedCardIDs.some(id => id === cardID) ?
          { color: 'red' }
          : null
      )
    }

    const selectedDeckName = this.state.selectedDeck.deck_name && this.state.selectedDeck.deck_name

    return (
      <div className="Manage">

        <h2>Manage</h2>

        <MakeCard />
        <CardsFilter
          uniqByProp={'card_id'}
          filterFn={card => card.card_id}
        ><h3>Cards</h3>
        </CardsFilter>

        <MakeDeck />
        <div>
          <h3>Decks</h3>
          {
            _.uniqBy(this.props.cardsAndDecks, 'deck_id')
              .filter(deck => !!deck.deck_id)
              .map(deck => (
                <div key={deck.deck_id} onClick={() => this.selectDeck(deck)}>
                  {deck.deck_name}
                  <span onClick={e => this.removeDeck(e, deck.deck_id)}> x </span>
                </div>
              ))
          }
        </div>

        <CardsFilter
          uniqByProp={'cid_id'}
          filterFn={card => card.deck_id === this.state.selectedDeck.deck_id && card.card_id}
        ><h3 onClick={this.addCardsToDeck}>{selectedDeckName}</h3>
        </CardsFilter>


        <button onClick={() => this.props.deleteCards(this.props.selectedCardIDs)}> Delete selected cards</button>
        <button onClick={this.removeCards}> Remove cards from selected deck </button>

      </div>
    )
  }
}

const actionCreators = {
  getCardsAndDecks,
  addCardsToDeck,
  removeCardsFromDeck,
  deleteDeck,
  deleteCards
};

export default connect(state => state, actionCreators)(Manage);