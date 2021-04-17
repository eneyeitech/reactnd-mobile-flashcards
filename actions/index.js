export const LOAD_DECKS = "LOAD_DECKS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";

export function loadDecks(decks) {
  return {
    type: LOAD_DECKS,
    decks
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function deleteDeck(deckId) {
  return {
    type: DELETE_DECK,
    deckId
  };
}

export function addCard(card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId
  };
}
