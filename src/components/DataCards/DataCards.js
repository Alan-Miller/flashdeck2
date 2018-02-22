/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PROPS:
  selectCardIDs:                    Redux action
  cardsAndDecks, selectedCardIDs:   values on Redux state
  title, uniqBy, filter:            optional props from parent
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectCardIDs } from '../../ducks/reducer';

function DataCards({ selectCardIDs, cardsAndDecks, selectedCardIDs, title, uniqBy, filter, onClick, children }) {
  const selectionStyles = (cardID) => selectedCardIDs.some(id => id === cardID) ? { color: 'red' } : null

  return (
    <div className="DataCards">
      {title || null}
      <br />
      { // list of filtered cards
        _.uniqBy(cardsAndDecks, uniqBy || (item => item))
          .filter(filter || (item => item))
          .map(card => (
            <div
              key={card.card_id}
              className="card"
              style={selectionStyles(card.card_id)}
              onClick={() => selectCardIDs(selectedCardIDs, card.card_id)}
            >
              <div className="front">{card.front}</div>
              <div className="back">{card.back}</div>
            </div>
          ))
      }
    </div>
  )
}
export default connect(state => state, { selectCardIDs })(DataCards);