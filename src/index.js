import "./styles/index.scss";
import { cardSearcher, card } from './scripts/card_searcher';
import cardGenerator from './scripts/card_generator';
// import 'babel-polyfill';

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("center");
  const board = document.createElement("div");
  const searchBar = document.createElement("form");
  const inputField = document.createElement("input");
  const submitButton = document.createElement("button");
  const cardContainer = document.createElement("div");

  board.classList.add("board", "center");
  submitButton.innerHTML = "Search";
  submitButton.classList.add('search-button')
  inputField.setAttribute("id", "searchbar");
  inputField.setAttribute("placeholder", "Search for a card...");
  inputField.classList.add("searchbar");

  searchBar.classList.add("searchbar-container");
  cardContainer.setAttribute("id", "card-container");
  cardContainer.classList.add("card-container");

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    cardSearcher()
      .then(card => cardGenerator(card))
  })
  // pass the return value to a function that amends the all components

  board.append(searchBar);
  searchBar.append(inputField);
  searchBar.append(submitButton);
  document.body.append(board);
  board.append(cardContainer);
});