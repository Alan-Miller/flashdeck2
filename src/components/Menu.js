import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../ducks/reducer';

class Menu extends React.Component {

  componentWillMount() {
    this.props.getUser()
  }

  render() {
    console.log("user", this.props.user)
    return (
      <div className="Menu">

        <h2>Hello {this.props.user ? this.props.user.username : null}!</h2>

        <div className="Menu__row">
          <Link to="/quiz" >
            <h2>Quiz</h2>
          </Link>
          {
            this.props.user ?
              <div className="deckSwap">
                <h3>{this.props.user.qd_name}</h3>
                <h5>swap?</h5>
                <details></details>
              </div>
              :
              null
          }
        </div>

        <Link to="/manage" >
          <div className="Menu__row">
            <h2>Manage</h2>
          </div>
        </Link>

        <a href={process.env.REACT_APP_AUTH} >
          <div className="Menu__row">
            <h2>Log in</h2>
          </div>
        </a>

      </div>
    )
  }
}

export default connect(state => state, { getUser })(Menu);