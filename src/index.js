import "./styles/index.scss";
import { cardSearcher, card } from './scripts/card_searcher';
import cardGenerator from './scripts/card_generator';

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("center");
  const board = document.createElement("div");
  const searchBar = document.createElement("form");
  const inputField = document.createElement("input");
  const submitButton = document.createElement("button");
  const cardContainer = document.createElement("div");

  board.classList.add("board", "center");
  submitButton.innerHTML = "Search";
  inputField.setAttribute("id", "searchbar");
  searchBar.classList.add("searchbar-container");
  cardContainer.setAttribute("id", "card-container");
  inputField.classList.add("searchbar");
  cardContainer.classList.add("card-container");

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    cardSearcher();
    //  THIS NEEDS TO BE REPLACED LATER WITH A FUNCTION THAT HIDES THE DELAY
    setTimeout(() => cardGenerator(card), 800)
  })
  // pass the return value to a function that amends the all components

  board.append(searchBar);
  searchBar.append(inputField);
  searchBar.append(submitButton);
  document.body.append(board);
  board.append(cardContainer);
});