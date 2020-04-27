import "./styles/index.scss";
import { cardSearcher } from './scripts/card_searcher'

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("center");
  const card = document.createElement("div");
  const searchBar = document.createElement("form");
  const inputField = document.createElement("input");
  const submitButton = document.createElement("button");

  card.classList.add("card", "center");
  submitButton.innerHTML = "Search";

  inputField.setAttribute("id", "searchbar");
  submitButton.addEventListener('click', cardSearcher)

  card.append(searchBar);
  searchBar.append(inputField);
  searchBar.append(submitButton);
  document.body.append(card);
});