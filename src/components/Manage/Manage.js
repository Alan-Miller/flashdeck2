import React from 'react';
import MakeCard from './MakeCard';
import MakeDeck from './MakeDeck';
import DataCards from '../DataCards/DataCards';
import DecksList from '../DecksList/DecksList';
import { connect } from 'react-redux';
import {
  getUser,
  getCardsAndDecks,
  addCardsToDeck,
  removeCardsFromDeck,
  selectCardIDs,
  deleteDeck,
  deleteCards
} from '../../ducks/reducer';

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
    const { selectedDeckID, selectedCardIDs, deleteCards, cardsAndDecks } = this.props
    const selectedDeckName = (
      selectedDeckID > 0 &&
      cardsAndDecks.find(item => item.deck_id === selectedDeckID).deck_name
    )

    return (
      <div className="Manage">

        <h2>Manage</h2>

        <br />

        <MakeCard />

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
            <DataCards
              title={<h3 onClick={this.addCardsToDeck}>{selectedDeckName}</h3>}
              uniqBy={'cid_id'}
              filter={card => card.deck_id === selectedDeckID && card.card_id}
            />
            : selectedDeckID === -1 ? // if ID is -1 show loose cards
              <DataCards
                title={<h3>Loose cards</h3>}
                uniqBy={'card_id'}
                filter={card => !card.deck_id && card.card_id}
              />
              : selectedDeckID === 0 ? // if ID is 0 show all cards
                <DataCards
                  title={<h3>Cards</h3>}
                  uniqBy={'card_id'}
                  filter={card => card.card_id}
                />
                : null

        }
        <br /><br /><br />

        <button onClick={() => deleteCards(selectedCardIDs)}> Delete selected cards</button>
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