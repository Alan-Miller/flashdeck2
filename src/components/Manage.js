import React from 'react';
import MakeCard from './MakeCard';
import MakeDeck from './MakeDeck';
import CardsFilter from './CardsFilter';
import DecksFilter from './DecksFilter';
import { connect } from 'react-redux';
import {
  getUser,
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
      selectedDeckID: 0
    }

    this.addCardsToDeck = this.addCardsToDeck.bind(this)
    this.removeCards = this.removeCards.bind(this)
  }

  componentWillMount() {
    this.props.getUser()
    this.props.getCardsAndDecks()
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

        <MakeCard />
        <CardsFilter
          title={<h3>Cards</h3>}
          uniqByProp={'card_id'}
          filterFn={card => card.card_id}
        >
        </CardsFilter>

        <MakeDeck />

        {
          <DecksFilter
            title={<h3>Decks</h3>}
            uniqByProp={'deck_id'}
            filterFn={deck => !!deck.deck_id}
          >
          </DecksFilter>
        }

        {
          selectedDeckName ?
            <CardsFilter
              title={<h3 onClick={this.addCardsToDeck}>{selectedDeckName}</h3>}
              uniqByProp={'cid_id'}
              filterFn={card => card.deck_id === this.props.selectedDeckID && card.card_id}
            />
            :
            <CardsFilter
              title={<h3>Cards without decks</h3>}
              uniqByProp={'card_id'}
              filterFn={card => !card.deck_id && card.card_id}
            />

        }


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
  deleteDeck,
  deleteCards
};

export default connect(state => state, actionCreators)(Manage);