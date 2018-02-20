import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  getUser, 
  swapDeck, 
  getCardsAndDecks 
} from '../ducks/reducer';
import DecksFilter from './DecksFilter';

class Menu extends React.Component {

  componentWillMount() {
    this.props.getUser()
    this.props.getCardsAndDecks()
  }

  render() {

    const { user } = this.props
    console.log('user', user)

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
                <h3>{user.qd_id === 0 ? 'Loose cards' : user.qd_name}</h3>
                <h5>swap?</h5>
                <div className="deckDiv">
                  <DecksFilter
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
  getUser, 
  swapDeck, 
  getCardsAndDecks 
}

export default connect(state => state, actionCreators)(Menu);