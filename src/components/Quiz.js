import React from 'react';
import { connect } from 'react-redux';
import {
  getUser
} from '../ducks/reducer';

class Quiz extends React.Component {

  componentWillMount() {
    this.props.getUser()
  }

  render() {
    return (
      <div className="Quiz" >
        Quiz
        {this.props.user ? this.props.user.username : null}
        {this.props.user ? this.props.user.quiz_deck_id : null}
      </div>
    )
  }
}

const actionCreators = {
  getUser
}

export default connect(state => state, actionCreators)(Quiz);