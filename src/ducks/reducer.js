import axios from 'axios';
import types from './types'; // action.type constants

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

    case types.GET_USER + '_FULFILLED':
    case types.SWAP_DECK + '_FULFILLED':
      return Object.assign({}, state, { user: action.payload })

    case types.GET_CARDS_AND_DECKS + '_FULFILLED':
    case types.ADD_CARDS_TO_DECK + '_FULFILLED':
    case types.REMOVE_CARDS_FROM_DECK + '_FULFILLED':
    case types.MAKE_NEW_CARDS + '_FULFILLED':
    case types.MAKE_NEW_DECK + '_FULFILLED':
    case types.DELETE_CARDS + '_FULFILLED':
    case types.DELETE_DECK + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })

    case types.SELECT_CARD_IDS:
      return Object.assign({}, state, { selectedCardIDs: action.payload })
    case types.SELECT_DECK_ID:
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
    type: types.SWAP_DECK,
    payload: axios.patch(`/api/decks/${deckID}/mode/${mode}`).then(user => {
      return user.data
    })
  }
}

export function getUser() {
  return {
    type: types.GET_USER,
    payload: axios.get('/api/user').then(user => {
      return user.data
    })
  }
}

export function selectCardIDs(selectedCardIDs, cardID) {
  const cardIsAlreadySelected = selectedCardIDs.find(id => id === cardID)
  return {
    type: types.SELECT_CARD_IDS,
    payload: cardIsAlreadySelected ? selectedCardIDs.filter(id => id !== cardID) : [...selectedCardIDs, cardID]
  }
}

export function selectDeckID(deckID) {
  return {
    type: types.SELECT_DECK_ID,
    payload: deckID
  }
}

export function getCardsAndDecks() {
  return {
    type: types.GET_CARDS_AND_DECKS,
    payload: axios.get('/api/cards').then(cards => {
      return cards.data
    })
  }
}

export function addCardsToDeck(cardIDs, deckID) {
  return {
    type: types.ADD_CARDS_TO_DECK,
    payload: axios.post(`/api/decks/${deckID}`, { cardIDs }).then(decks => {
      return decks.data
    })
  }
}

export function removeCardsFromDeck(cardIDs, deckID) {
  if (!cardIDs.length || deckID <= 0) return { type: null }
  else return {
    type: types.REMOVE_CARDS_FROM_DECK,
    payload: axios.delete(`/api/decks/${deckID}`, { data: { cardIDs } }).then(decks => {
      return decks.data
    })
  }
}

export function makeNewCards(cards) {
  return {
    type: types.MAKE_NEW_CARDS,
    payload: axios.post('/api/cards', { cards }).then(cards => cards.data)
  }
}

export function makeNewDeck(deckName) {
  return {
    type: types.MAKE_NEW_DECK,
    payload: axios.post('/api/decks', { deckName }).then(decks => decks.data)
  }
}

export function deleteCards(cardIDs) {
  return {
    type: types.DELETE_CARDS,
    payload: axios.delete('/api/cards', { data: { cardIDs } }).then(cards => cards.data)
  }
}

export function deleteDeck(deckID) {
  return {
    type: types.DELETE_DECK,
    payload: axios.delete(`/api/decks/${deckID}`).then(decks => decks.data)
  }
}