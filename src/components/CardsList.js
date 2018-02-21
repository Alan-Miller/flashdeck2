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
import GameCard from './GameCard';

function CardsList({ selectCardIDs, cardsAndDecks, selectedCardIDs, title, uniqBy, filter, onClick }) {

  return (
    <div className="CardsList">
      {title || null}
      <br />
      { // list of filtered cards
        _.uniqBy(cardsAndDecks, uniqBy || (item => item))
          .filter(filter || (item => item))
          .map(card => (
            <GameCard
              key={card.card_id}
              card={card}
            />
          ))
      }
    </div>
  )
}
export default connect(state => state, { selectCardIDs })(CardsList);