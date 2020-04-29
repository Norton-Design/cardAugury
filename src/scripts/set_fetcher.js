export let cardSet;

export const cardSearcher = setCode => {
  const searchUrl = `https://api.scryfall.com/cards/search?order=set&q=e%3A${setCode}&unique=prints`;
  return fetch(searchUrl)
    .then(res => {
      const promise = res.json();
      promise.then(value => {
        console.log(value)
        cardSet = value.data;
      })
    })
    .catch(() => console.log("ERROR"))
}

export const validInput = searchInput => ( searchInput.split(' ').join("-") )