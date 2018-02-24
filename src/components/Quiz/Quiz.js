import React from 'react';
import PilesLayout from '../PilesLayout/PilesLayout';
import InfoBar from '../InfoBar/InfoBar';

export default function Quiz(props) {
  const { user, cardsAndDecks } = props

  return (
    <div className="Quiz" >
      <InfoBar user={user} />
      <PilesLayout user={user} cardsAndDecks={cardsAndDecks}/>
    </div>
  )
}