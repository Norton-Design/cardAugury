import "./styles/index.scss";
import { cardSearcher } from './scripts/card_searcher';
import cardGenerator from './scripts/card_generator';

window.addEventListener("DOMContentLoaded", () => {
  const board = document.createElement("div");
  const searchBar = document.createElement("form");
  const inputField = document.createElement("input");
  const submitButton = document.createElement("button");
  const searchIcon = document.createElement("i");
  const titleContainer = document.createElement('div');
  const title = document.createElement("h1");
  const titleImg = document.createElement("img");

  document.body.classList.add("center");
  document.body.append(board);

  board.classList.add("board", "center");
  board.setAttribute('id', "main-board")
  board.append(titleContainer)
  board.append(searchBar);

  titleContainer.append(titleImg);
  titleContainer.append(title);
  titleContainer.classList.add("title-container")

  titleImg.setAttribute("src", "./src/images/final-owl2.png")

  title.innerHTML = "Card Augury"

  searchIcon.classList.add("fa");
  searchIcon.classList.add("fa-search");

  submitButton.append(searchIcon);
  submitButton.classList.add('search-button');

  inputField.setAttribute("id", "searchbar");
  inputField.setAttribute("placeholder", "Search for a card...");
  inputField.classList.add("searchbar");

  searchBar.classList.add("searchbar-container");
  searchBar.append(inputField);
  searchBar.append(submitButton);

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    cardSearcher()
      .then(card => cardGenerator(card))
  })
  // pass the return value to a function that amends the all components
});