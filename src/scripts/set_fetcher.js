export let cardSet;

export const setFetcher = setCode => {
  const searchUrl = `https://api.scryfall.com/cards/search?order=usd&q=e%3A${setCode}&unique=prints`;
  return fetch(searchUrl)
    .then(res => {
      const promise = res.json();
      promise.then(value => {
        cardSet = value.data;
      })
    })
    .catch(() => console.log("ERROR"))
}

export const validInput = searchInput => ( searchInput.split(' ').join("-") )