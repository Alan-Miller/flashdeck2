import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Menu(props) {
  return (
    <div className="Menu">

      <Link to="/quiz" >
        <h2>Quiz</h2>
      </Link>

      <Link to="/manage" >
        <h2>Manage</h2>
      </Link>

      <a href={process.env.REACT_APP_AUTH} >
        <h2>Log in</h2>
      </a>

    </div>
  )
}

export default connect()(Menu);