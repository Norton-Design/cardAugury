import 'babel-polyfill';

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

        return setMerge([json, nextJson]);
      }
    } else {
    return await json;
  }
}

const setMerge = async (arrOfSets) => {
  let baseSet = arrOfSets[0];

  for (let i = 1; i < arrOfSets.length; i++){
    const mergingSet = arrOfSets[i];
    baseSet.data = baseSet.data.concat(mergingSet.data)
  }

  return baseSet;
}


