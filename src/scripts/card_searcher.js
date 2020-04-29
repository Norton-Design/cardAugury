export let card;
import 'babel-polyfill';

export const cardSearcher = async (e) => {
  // e.preventDefault();
  const inputStr = document.getElementById("searchbar").value;
  const url = 'https://api.scryfall.com/cards/named?fuzzy=';
  const searchUrl = url + validSearchInput(inputStr);

  const response = await fetch(searchUrl);
  const json = await response.json();
  card = await json;

  return card;
}

export const validSearchInput = searchInput => ( searchInput.split(' ').join("-") )
