/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PROPS:
  selectDeckID:                   Redux action
  cardsAndDecks, mode:            props from parent
  title, uniqBy, filter, deckFn:  optional props from parent
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  selectDeckID
} from '../../ducks/reducer';

export function DecksList(props) {

  const { cardsAndDecks, title, mode, selectDeckID } = props
  const uniqBy = props.uniqBy || (item => item)
  const filter = props.filter || (item => item)
  const deckFn = props.deckFn || selectDeckID

  return (
    <div className="DecksList">
      {title || null}
      {
        _.uniqBy(cardsAndDecks, uniqBy)
          .filter(filter)
          .map(deck => (
            <div key={deck.deck_id} onClick={() => deckFn(deck.deck_id, mode)}>
              {deck.deck_name}
            </div>
          ))
      }
      <div key={-1} onClick={() => deckFn(-1, mode)}>Loose cards</div>
      <div key={0} onClick={() => deckFn(0, mode)}>All cards</div>
    </div>
  )

}

const actionCreators = {
  selectDeckID
};

export default connect(null, actionCreators)(DecksList);