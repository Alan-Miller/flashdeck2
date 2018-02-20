import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  setSelectedDeckID,
  deleteCards
} from '../ducks/reducer';

export function DecksFilter(props) {

  function removeDeck(e, deckID) {
    e.stopPropagation()
    props.deleteDeck(deckID)
  }

  const deckFn = props.deckFn || props.setSelectedDeckID;

  return (
    <div className="DecksFilter">
      {props.title || null}
      {
        _.uniqBy(props.cardsAndDecks, props.uniqBy || (item => item))
          .filter(props.filter || (item => item))
          .map(deck => (
            <div key={deck.deck_id} onClick={() => deckFn(deck.deck_id, props.mode)}>
              {deck.deck_name}
            </div>
          ))
      }
      <div key={0} onClick={() => deckFn(0)}>Loose cards</div>
    </div>
  )

}

const actionCreators = {
  setSelectedDeckID,
  deleteCards
};

export default connect(state => state, actionCreators)(DecksFilter);

// {/* <span onClick={e => removeDeck(e, deck.deck_id)}> x </span> */}