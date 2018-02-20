import axios from 'axios';
import t from './types'; // action.type constants

/*———————————————————————————————————————————————————————————————*
  structure of state
/*———————————————————————————————————————————————————————————————*/
const initialState = {
  user: {},
  cardsAndDecks: [],
  selectedDeckID: 0,
  selectedCardIDs: []
}

/*———————————————————————————————————————————————————————————————*
  reducer function
/*———————————————————————————————————————————————————————————————*/
export default function (state = initialState, action) {
  switch (action.type) {

    case t.GET_USER + '_FULFILLED':
    case t.SWAP_DECK + '_FULFILLED':
      return Object.assign({}, state, { user: action.payload })

    case t.GET_CARDS_AND_DECKS + '_FULFILLED':
    case t.ADD_CARDS_TO_DECK + '_FULFILLED':
    case t.REMOVE_CARDS_FROM_DECK + '_FULFILLED':
    case t.MAKE_NEW_CARDS + '_FULFILLED':
    case t.MAKE_NEW_DECK + '_FULFILLED':
    case t.DELETE_CARDS + '_FULFILLED':
    case t.DELETE_DECK + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })

    case t.SET_SELECTED_CARD_IDS:
      return Object.assign({}, state, { selectedCardIDs: action.payload })
    case t.SET_SELECTED_DECK_ID:
      return Object.assign({}, state, { selectedDeckID: action.payload })

    default:
      return state
  }
}

/*———————————————————————————————————————————————————————————————*
  action creators
/*———————————————————————————————————————————————————————————————*/
export function swapDeck(deckID, mode) {
  return {
    type: t.SWAP_DECK,
    payload: axios.patch(`/api/decks/${deckID}/mode/${mode}`).then(user => {
      return user.data
    })
  }
}

export function getUser() {
  return {
    type: t.GET_USER,
    payload: axios.get('/api/user').then(user => {
      return user.data
    })
  }
}

export function setSelectedCardIDs(cardIDs) {
  return {
    type: t.SET_SELECTED_CARD_IDS,
    payload: cardIDs
  }
}

export function setSelectedDeckID(deckID) {
  return {
    type: t.SET_SELECTED_DECK_ID,
    payload: deckID
  }
}

export function getCardsAndDecks() {
  return {
    type: t.GET_CARDS_AND_DECKS,
    payload: axios.get('/api/cards').then(cards => {
      return cards.data
    })
  }
}

export function addCardsToDeck(cardIDs, deckID) {
  return {
    type: t.ADD_CARDS_TO_DECK,
    payload: axios.post(`/api/decks/${deckID}`, { cardIDs }).then(decks => {
      return decks.data
    })
  }
}

export function removeCardsFromDeck(cardIDs, deckID) {
  return {
    type: t.REMOVE_CARDS_FROM_DECK,
    payload: axios.delete(`/api/decks/${deckID}`, { data: { cardIDs } }).then(decks => {
      return decks.data
    })
  }
}

export function makeNewCards(cards) {
  return {
    type: t.MAKE_NEW_CARDS,
    payload: axios.post('/api/cards', { cards }).then(cards => cards.data)
  }
}

export function makeNewDeck(deckName) {
  return {
    type: t.MAKE_NEW_DECK,
    payload: axios.post('/api/decks', { deckName }).then(decks => decks.data)
  }
}

export function deleteCards(cardIDs) {
  return {
    type: t.DELETE_CARDS,
    payload: axios.delete('/api/cards', { data: { cardIDs } }).then(cards => cards.data)
  }
}

export function deleteDeck(deckID) {
  return {
    type: t.DELETE_DECK,
    payload: axios.delete(`/api/decks/${deckID}`).then(decks => decks.data)
  }
}