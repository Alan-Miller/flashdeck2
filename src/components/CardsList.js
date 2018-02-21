/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PROPS:
  selectCardIDs:                    Redux action
  cardsAndDecks, selectedCardIDs:   values on Redux state
  title, uniqBy, filter:            optional props from parent
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectCardIDs } from '../ducks/reducer';

function CardsList({ selectCardIDs, cardsAndDecks, selectedCardIDs, title, uniqBy, filter, onClick}) {

  const selectedStyles = (cardID) => selectedCardIDs.some(id => id === cardID) ? { color: 'red' } : null
  return (
    <div className="CardsList">
      {title || null}
      <br />
      { // list of filtered cards
        _.uniqBy(cardsAndDecks, uniqBy || (item => item))
          .filter(filter || (item => item))
          .map(card => (
            <div
              key={card.card_id}
              style={selectedStyles(card.card_id)}
              onClick={() => selectCardIDs(selectedCardIDs, card.card_id)}
            >
              {card.front} {card.back}
            </div>
          ))
      }
    </div>
  )
}
export default connect(state => state, { selectCardIDs })(CardsList);