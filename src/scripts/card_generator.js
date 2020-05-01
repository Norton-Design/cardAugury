import { setFetcher } from './set_fetcher'
import { typeTotals } from './set_stats_util';
import 'babel-polyfill';
const Highcharts = require('highcharts'); 
require('highcharts/modules/exporting')(Highcharts);
// Create the chart
// Highcharts.chart('container', { /*Highcharts options*/ });

const cardGenerator = async (cardInfo) => {
  const board = document.getElementById("main-board");
  const prevContainer = document.getElementById("card-container");
  const cardContainer = document.createElement("div");
  const imgLink = cardInfo.image_uris.normal;

  if (prevContainer) board.removeChild(prevContainer);

  board.append(cardContainer);

  cardContainer.append(imgCreator(imgLink));
  cardContainer.append(statBlockCreator(cardInfo));
  cardContainer.append(setStatsCreator());
  cardContainer.setAttribute("id", "card-container");
  cardContainer.classList.add("card-container");

  setFetcher(cardInfo)
    .then(cardSet => setStatsCreator(cardInfo, cardSet))
}

const imgCreator = imgLink => {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  const img = document.createElement("img");
  img.setAttribute("src", imgLink);
  imgContainer.append(img);

  return imgContainer;
}

const statBlockCreator = (cardInfo) => {
  const { 
    name, 
    mana_cost, 
    rarity, 
    oracle_text, 
    set_name, 
    type_line,  
  } = cardInfo;

  const statBlockContainer = document.createElement("ul");
  statBlockContainer.classList.add("stat-block-container");

  const cardTitle = document.createElement("li")
  const title = document.createElement("h2")
  const cardCost = document.createElement("div");
  cardCost.innerHTML = mana_cost;
  title.innerHTML = name;
  cardTitle.append(title)
  cardTitle.append(cardCost);
  cardTitle.classList.add("card-title-container");
  statBlockContainer.append(cardTitle);

  const hr = document.createElement("hr");
  statBlockContainer.append(hr);

  const cardType = document.createElement("li");
  cardType.innerHTML = type_line;
  statBlockContainer.append(cardType);

  const cardSetName = document.createElement("li");
  cardSetName.innerHTML = set_name;
  statBlockContainer.append(cardSetName);

  const cardRarity = document.createElement("li");
  cardRarity.innerHTML = capitalize(rarity);
  statBlockContainer.append(cardRarity);

  const cardOracle = document.createElement("li");
  cardOracle.innerHTML = oracle_text;
  statBlockContainer.append(cardOracle);





  return statBlockContainer;
}

const setStatsCreator = (cardInfo, cardSet) => {
  const setStatContainer = document.createElement('div');
  const genSetButton = document.createElement("button")

  setStatContainer.append(genSetButton)
  setStatContainer.classList.add('set-stats-container')
  genSetButton.innerHTML = 'Generate Set Breakdown';

  typeTotals(cardSet).then(totalBreakdown => {
    console.log(totalBreakdown);
    const typeChart = Highcharts.chart('set-stats-container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: `Card Types in ${cardSet.name}`
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Types',
        colorByPoint: true,
        data: totalBreakdown.types.entities.map(pair => {
          return {name: pair[0], y: pair[1]}
        })
      }]
    });
  })

  return setStatContainer;
  // RETURN OR BUILD COMPONENT
  // HIGHCHARTS:
  // CARD TYPE BREAKDOWN PIECHART 
  // CARD PRICE COMPARED TO THE TOP TEN VALUABLE CARDS OF THE SET
  // AND ITS RANK, AT THAT
}

const capitalize = str =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default cardGenerator;