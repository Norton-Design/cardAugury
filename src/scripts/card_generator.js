
const cardGenerator = cardInfo => {
  console.log(cardInfo);
  const cardContainer = document.getElementById("card-container");
  const price = cardInfo.prices;
  const imgLink = cardInfo.image_uris.normal;

  cardContainer.append(imgCreator(imgLink));
  cardContainer.append(statBlockCreator(cardInfo));

}

const imgCreator = imgLink => {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  const img = document.createElement("img");
  img.setAttribute("src", imgLink);
  imgContainer.append(img);

  return imgContainer;
}

const statBlockCreator = cardInfo => {
  const { 
    name, 
    mana_cost, 
    rarity, 
    oracle_text, 
    set_name, 
    type_line, 
    cmc } = cardInfo;

  const statBlockContainer = document.createElement("ul");
  statBlockContainer.classList.add("stat-block-container");

  const cardTitle = document.createElement("li")
  const title = document.createElement("h1")
  title.innerHTML = name;
  cardTitle.append(title)
  statBlockContainer.append(cardTitle);

  const cardCost = document.createElement("li");
  cardCost.innerHTML = mana_cost;
  statBlockContainer.append(cardCost);

  const cardRarity = document.createElement("li");
  cardRarity.innerHTML = capitalize(rarity);
  statBlockContainer.append(cardRarity);

  const cardOracle = document.createElement("li");
  cardOracle.innerHTML = oracle_text;
  statBlockContainer.append(cardOracle);

  const cardSetName = document.createElement("li");
  cardSetName.innerHTML = set_name;
  statBlockContainer.append(cardSetName);

  const cardType = document.createElement("li");
  cardType.innerHTML = type_line;
  statBlockContainer.append(cardType);

  return statBlockContainer;
}

const setStatsCreator = cardInfo => {

}

const capitalize = str =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default cardGenerator;