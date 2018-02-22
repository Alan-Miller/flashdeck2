import React from 'react';

function InfoBar(props) {
  return (
    <div className="InfoBar">
      {props.user ? props.user.username : null}
      {props.user ? props.user.qd_name : null}
    </div>
  )
}

export default InfoBar;