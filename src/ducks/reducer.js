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
  console.log("AXION", action)
  console.log("STATE", state)
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
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    case types.DELETE_DECK + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload, selectedDeckID: 0 })

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
    payload: axios.patch(`/api/decks/${deckID}/mode/${mode}`)
      .then(user => user.data)
      .catch(err => console.log(`Error swapping deck: ${err}`))
  }
}

export function getUser() {
  return {
    type: types.GET_USER,
    payload: axios.get('/api/user')
      .then(user => user.data)
      .catch(err => console.log(`Error getting user: ${err}`))
  }
}

export function selectCardIDs(selectedCardIDs, cardID) {
  // NOTE: If card is already a selected card, it should be unselected
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
  const payload = axios.get('/api/cards')
    .then(cards => { console.log("crds", cards); return cards.data })
    .catch(err => console.log(`Error getting cards and decks: ${err}`))
  return {
    type: types.GET_CARDS_AND_DECKS,
    payload
  }
}

export function addCardsToDeck(cardIDs, deckID) {
  const payload = axios.post(`/api/decks/${deckID}`, { cardIDs })
    .then(decks => {console.log("dks", decks); return decks.data})
    .catch(err => console.log(`Error adding cards to deck: ${err}`))
    console.log("PAYLOAD", payload)
  return {
    type: types.ADD_CARDS_TO_DECK,
    payload
  }
}

export function removeCardsFromDeck(cardIDs, deckID) {
  if (!cardIDs.length || deckID <= 0) return { type: null }
  else return {
    type: types.REMOVE_CARDS_FROM_DECK,
    payload: axios.delete(`/api/cards/decks/${deckID}`, { data: { cardIDs } })
      .then(decks => decks.data)
      .catch(err => console.log(`Error removing cards from deck: ${err}`))
  }
}

export function makeNewCards(cards) {
  return {
    type: types.MAKE_NEW_CARDS,
    payload: axios.post('/api/cards', { cards })
      .then(cards => cards.data)
      .catch(err => console.log(`Error making new cards: ${err}`))
  }
}

export function makeNewDeck(deckName) {
  return {
    type: types.MAKE_NEW_DECK,
    payload: axios.post('/api/decks', { deckName })
      .then(decks => decks.data)
      .catch(err => console.log(`Error making new deck: ${err}`))
  }
}

export function deleteCards(cardIDs) {
  return {
    type: types.DELETE_CARDS,
    payload: axios.delete('/api/cards', { data: { cardIDs } })
      .then(cards => cards.data)
      .catch(err => console.log(`Error deleting cards: ${err}`))
  }
}

export function deleteDeck(deckID) {
  const payload = axios.delete(`/api/decks/${deckID}`)
    .then(decks => decks.data)
    .catch(err => console.log(`Error deleting deck: ${err}`))
  return {
    type: types.DELETE_DECK,
    payload
  }
}