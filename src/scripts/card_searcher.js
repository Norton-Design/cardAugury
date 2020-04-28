export let card;

export const cardSearcher = e => {
  // e.preventDefault();
  const inputStr = document.getElementById("searchbar").value;
  const url = 'https://api.scryfall.com/cards/named?fuzzy=';
  const searchUrl = url + validSearchInput(inputStr);
  // // send ES6 fetch request 
  return fetch(searchUrl)
    .then(res => {
      const promise = res.json();
      promise.then(value => {
        // console.log(value)
        card = value
        // return value;
      })
    })
    .catch(err => console.log("ERROR"))
}

export const validSearchInput = searchInput => ( searchInput.split(' ').join("-") )
