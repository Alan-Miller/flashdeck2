/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PROPS:
  cardsAndDecks:          value on Redux state
  title, uniqBy, filter:  optional props from parent
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styles from '../styles';

function SquareCards({ cardsAndDecks, title, uniqBy, filter }) {
  return (
    <div className="SquareCards">
      {title || null}
      <br />
      {
        _.uniqBy(cardsAndDecks, uniqBy || (item => item))
          .filter(filter || (item => item))
          .map(card => (
            <div key={card.card_id} className="cardContainer">
              <div className="card" onClick={styles.flipPosition}>
                <div className="front">{card.front}</div>
                <div className="back">{card.back}</div>
              </div>
            </div>

          ))
      }
    </div>
  )
}
export default connect(state => state)(SquareCards);