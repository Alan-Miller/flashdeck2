/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  MainContainer
  - gets user and card/deck data and passes it to routes
  - not presentational
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { getUser, getCardsAndDecks } from '../../ducks/reducer';
import { connect } from 'react-redux';
import Menu from '../Menu/Menu';
import Quiz from '../Quiz/Quiz';
import Manage from '../Manage/Manage';

class MainContainer extends React.Component {
  componentWillMount() {
    this.props.getUser()
    this.props.getCardsAndDecks()
  }

  render() {
    const { user, cardsAndDecks } = this.props

    return (
      <div className="MainContainer">
        <Router>
          <Switch>
            <Route exact path="/" render={props => <Menu {...props} user={user} cardsAndDecks={cardsAndDecks} />} />
            <Route path="/quiz" render={props => <Quiz {...props} user={user} cardsAndDecks={cardsAndDecks} />} />
            <Route path="/manage" component={Manage} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default connect(
  ({ user, cardsAndDecks }) => ({ user, cardsAndDecks }), // user/card/deck info from Redux
  { getUser, getCardsAndDecks } // user/card/deck info from db is put on Redux
)(MainContainer)