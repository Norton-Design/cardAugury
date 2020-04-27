export const cardSearcher = e => {
  e.preventDefault();
  const inputStr = document.getElementById("searchbar").value;
  // console.log(inputStr);
  const url = 'https://api.scryfall.com/cards/named?fuzzy=';
  const searchUrl = url + validSearchInput(inputStr);
  // // send ES6 fetch request 
  return fetch(searchUrl)
  //   // .then(data => data.json())
    .then(res => console.log(res))
    .catch(err => console.log("ERROR"))
  // return JSON object of search result
}

export const validSearchInput = searchInput => ( searchInput.split(' ').join("-") )
