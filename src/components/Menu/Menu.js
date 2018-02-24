import React from 'react';
import DecksList from '../DecksList/DecksList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  swapDeck
} from '../../ducks/reducer';

class Menu extends React.Component {

  render() {
    const { user, cardsAndDecks } = this.props

    return (
      <div className="Menu">

        <h2>Hello{user ? ' ' + user.username : null}!</h2>

        <div className="Menu__row">
          <Link to="/quiz" >
            <h2>Quiz</h2>
          </Link>
          {
            user ?

              <div className="deckSwap">
                <h3>{user.qd_name}</h3>
                <h5>swap?</h5>
                <div className="deckDiv">
                  <DecksList
                    cardsAndDecks={cardsAndDecks}
                    uniqBy={'deck_id'}
                    filter={deck => deck.deck_id}
                    deckFn={this.props.swapDeck}
                    mode="quiz"
                  />
                </div>
              </div>

              : null
          }
        </div>

        <div className="Menu__row">
          <Link to="/manage" >
            <h2>Manage</h2>
          </Link>
        </div>

        <div className="Menu__row">
          <a href={process.env.REACT_APP_AUTH} >
            <h2>Log in</h2>
          </a>
        </div>

      </div>
    )
  }
}

const actionCreators = { 
  swapDeck
}

export default connect(null, actionCreators)(Menu);