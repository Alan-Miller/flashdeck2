import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  setSelectedCardIDs,
  setSelectedDeckID,
  deleteCards
} from '../ducks/reducer';

export function DecksFilter(props) {

  function removeDeck(e, deckID) {
    e.stopPropagation()
    props.deleteDeck(deckID)
  }

  function selectDeck(deckID) {
    props.setSelectedDeckID(deckID)
  }

  return (
    <div className="DecksFilter">
      {props.title || null}
      {
        _.uniqBy(props.cardsAndDecks, props.uniqByProp || (item => item))
          .filter(deck => !!deck.deck_id)
          .map(deck => (
            <div key={deck.deck_id} onClick={() => selectDeck(deck.deck_id)}>
              {deck.deck_name}
              <span onClick={e => removeDeck(e, deck.deck_id)}> x </span>
            </div>
          ))
      }
      <div key={0} onClick={() => selectDeck(0)}>Cards without decks</div>
    </div>
  )

}

const actionCreators = {
  setSelectedCardIDs,
  setSelectedDeckID,
  deleteCards
};

export default connect(state => state, actionCreators)(DecksFilter);