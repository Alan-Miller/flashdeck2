import axios from 'axios'

const initialState = {
  user: {},
  // colorTheme: '',
  cardsAndDecks: [],
  selectedDeckID: 0,
  selectedCardIDs: []
}

const GET_USER = 'GET_USER'
const GET_CARDS_AND_DECKS = 'GET_CARDS_AND_DECKS'
const SET_NEW_CARDS = 'SET_NEW_CARDS'
const SET_NEW_DECKS = 'SET_NEW_DECKS'
const DELETE_CARDS = 'DELETE_CARDS'
const DELETE_DECK = 'DELETE_DECK'
const ADD_CARDS_TO_DECK = 'ADD_CARDS_TO_DECK'
const REMOVE_CARDS_FROM_DECK = 'REMOVE_CARDS_FROM_DECK'
const SET_SELECTED_CARD_IDS = 'SET_SELECTED_CARD_IDS'
const SET_SELECTED_DECK_ID = 'SET_SELECTED_DECK_ID'

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get('/api/user').then(user => {
      return user.data
    })
  }
}

export function setSelectedCardIDs(cardIDs) {
  return {
    type: SET_SELECTED_CARD_IDS,
    payload: cardIDs
  }
}

export function setSelectedDeckID(deckID) {
  return {
    type: SET_SELECTED_DECK_ID,
    payload: deckID
  }
}

export function getCardsAndDecks() {
  return {
    type: GET_CARDS_AND_DECKS,
    payload: axios.get('/api/cards').then(cards => {
      return cards.data
    })
  }
}

export function addCardsToDeck(cardIDs, deckID) {
  return {
    type: ADD_CARDS_TO_DECK,
    payload: axios.post(`/api/decks/${deckID}`, { cardIDs }).then(decks => {
      return decks.data
    })
  }
}

export function removeCardsFromDeck(cardIDs, deckID) {
  return {
    type: REMOVE_CARDS_FROM_DECK,
    payload: axios.delete(`/api/decks/${deckID}`, { data: { cardIDs } }).then(decks => {
      return decks.data
    })
  }
}

export function setNewCards(cards) {
  return {
    type: SET_NEW_CARDS,
    payload: axios.post('/api/cards', { cards }).then(cards => cards.data)
  }
}

export function setNewDeck(deckName) {
  return {
    type: SET_NEW_DECKS,
    payload: axios.post('/api/decks', { deckName }).then(decks => decks.data)
  }
}

export function deleteCards(cardIDs) {
  return {
    type: DELETE_CARDS,
    payload: axios.delete('/api/cards', { data: { cardIDs } }).then(cards => cards.data)
  }
}

export function deleteDeck(deckID) {
  return {
    type: DELETE_DECK,
    payload: axios.delete(`/api/decks/${deckID}`).then(decks => decks.data)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER + '_FULFILLED':
      return Object.assign({}, state, { user: action.payload })
    case GET_CARDS_AND_DECKS + '_FULFILLED':
    case ADD_CARDS_TO_DECK + '_FULFILLED':
    case REMOVE_CARDS_FROM_DECK + '_FULFILLED':
    case SET_NEW_CARDS + '_FULFILLED':
    case SET_NEW_DECKS + '_FULFILLED':
    case DELETE_CARDS + '_FULFILLED':
    case DELETE_DECK + '_FULFILLED':
      return Object.assign({}, state, { cardsAndDecks: action.payload })
    case SET_SELECTED_CARD_IDS:
      return Object.assign({}, state, { selectedCardIDs: action.payload })
    case SET_SELECTED_DECK_ID:
      return Object.assign({}, state, { selectedDeckID: action.payload })
    default:
      return state
  }
}