import React from 'react';
import MakeCard from './MakeCard';
import MakeDeck from './MakeDeck';
import CardsList from './CardsList';
import DecksList from './DecksList';
import { connect } from 'react-redux';
import {
  getUser,
  getCardsAndDecks,
  addCardsToDeck,
  removeCardsFromDeck,
  selectCardIDs,
  deleteDeck,
  deleteCards
} from '../ducks/reducer';

class Manage extends React.Component {

  constructor() {
    super()
    this.addCardsToDeck = this.addCardsToDeck.bind(this)
    this.removeCards = this.removeCards.bind(this)
  }

  componentWillMount() {
    this.props.getUser()
    this.props.getCardsAndDecks()
  }

  componentWillUnmount() {
    this.props.selectCardIDs([])
  }

  addCardsToDeck() {
    if (!this.props.selectedCardIDs.length) return
    else this.props.addCardsToDeck(this.props.selectedCardIDs, this.props.selectedDeckID)
  }

  removeCards() {
    this.props.removeCardsFromDeck(this.props.selectedCardIDs, this.props.selectedDeckID)
  }

  render() {

    const selectedDeckName = !!this.props.selectedDeckID && this.props.cardsAndDecks.find(item => item.deck_id === this.props.selectedDeckID).deck_name

    return (
      <div className="Manage">

        <h2>Manage</h2>

        <br />

        <MakeCard />

        { // Show all cards
          <CardsList
            title={<h3>Cards</h3>}
            uniqBy={'card_id'}
            filter={card => card.card_id}
          />
        }
        <br />

        <MakeDeck />

        { // Show all deck names
          <DecksList
            title={<h3>Decks</h3>}
            uniqBy={'deck_id'}
            filter={deck => deck.deck_id}
          />
        }

        <br />

        { // If deck is selected, show those cards 
          selectedDeckName ?
            <CardsList
              title={<h3 onClick={this.addCardsToDeck}>{selectedDeckName}</h3>}
              uniqBy={'cid_id'}
              filter={card => card.deck_id === this.props.selectedDeckID && card.card_id}
            />
            : // otherwise show loose cards
            <CardsList
              title={<h3>Loose cards</h3>}
              uniqBy={'card_id'}
              filter={card => !card.deck_id && card.card_id}
            />

        }
        <br /><br /><br />

        <button onClick={() => this.props.deleteCards(this.props.selectedCardIDs)}> Delete selected cards</button>
        <button onClick={this.removeCards}> Remove cards from selected deck </button>

      </div>
    )
  }
}

const actionCreators = {
  getUser,
  getCardsAndDecks,
  addCardsToDeck,
  removeCardsFromDeck,
  selectCardIDs,
  deleteDeck,
  deleteCards
};

export default connect(state => state, actionCreators)(Manage);