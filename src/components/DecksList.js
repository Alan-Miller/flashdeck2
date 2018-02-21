/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PROPS:
  selectDeckID:                         Redux action
  cardsAndDecks:                        values on Redux state
  title, uniqBy, filter, deckFn, mode:  optional props from parent
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  selectDeckID,
  deleteCards
} from '../ducks/reducer';

export function DecksList(props) {

  // function removeDeck(e, deckID) {
  //   e.stopPropagation()
  //   props.deleteDeck(deckID)
  // }

  const deckFn = props.deckFn || props.selectDeckID;

  return (
    <div className="DecksList">
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
  selectDeckID,
  deleteCards
};

export default connect(state => state, actionCreators)(DecksList);

// {/* <span onClick={e => removeDeck(e, deck.deck_id)}> x </span> */}