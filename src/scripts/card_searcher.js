export let card;
import 'babel-polyfill';

export const cardSearcher = async (e) => {
  // e.preventDefault();
  const inputStr = document.getElementById("searchbar").value;
  const url = 'https://api.scryfall.com/cards/named?fuzzy=';
  const searchUrl = url + validSearchInput(inputStr);
  const errorTarget = document.getElementById("errors-container")
  const response = await fetch(searchUrl);
  const json = await response.json();

  errorTarget.innerHTML = ''
  card = await json;

  if (card.object === "error") {
    //make error and append to board.input
    const errorBanner = document.createElement('div');
    const error = document.createElement('h2')
    const board = document.getElementsByClassName("board")[0];

    board.style.margin = "5rem";

    errorBanner.setAttribute('id', "error-sub")
    error.setAttribute('id', 'error-message')

    error.innerHTML = card.details;
    errorBanner.append(error);
    errorTarget.append(errorBanner)

    return;
  }

  return card;
}

export const validSearchInput = searchInput => ( searchInput.split(' ').join("-") )
