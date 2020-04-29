import 'babel-polyfill';
export let cardSet;

export const setFetcher = async (cardInfo) => {
    const searchUrl = `https://api.scryfall.com/cards/search?order=usd&q=e%3A${cardInfo.set}&unique=prints`;
    const response = await fetch(searchUrl);
    const json = await response.json();

    if (json.has_more){
      const nextUrl = json.next_page;
      const nextResponse = await fetch(nextUrl);
      const nextJson = await nextResponse.json();
  
      if (nextJson.has_more){
        const finalUrl = nextJson.next_page;
        const finalResponse = await fetch(finalUrl);
        const finalJson = await finalResponse.json()

        return setMerge([json, nextJson, finalJson])
      } else {
        console.log(json);
        console.log(nextJson);
        return await nextJson;
      }
    } else {
    console.log(json);
    return await json;
  }
}

const setMerge = async (arrOfSets) => {
  let baseSet = arrOfSets[0];

  for (let i = 1; i < arrOfSets.length; i++){
    const mergingSet = arrOfSets[i];
    baseSet.data = baseSet.data.concat(mergingSet.data)
  }

  cardSet = baseSet;
  return baseSet;
}


