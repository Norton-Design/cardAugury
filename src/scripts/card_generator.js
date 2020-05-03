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
  const setStatContainer = document.createElement('div');
  const imgLink = cardInfo.image_uris.normal;
  const setPieChartPlaceholder = document.createElement('div');
  const setBarChartPlaceholder = document.createElement('div');

  if (prevContainer) board.removeChild(prevContainer);
  
  setStatContainer.classList.add('set-stats-container');
  setPieChartPlaceholder.setAttribute("id", "set-pie-ph"); // <--- TARGET TO REPLACE THE PIECHART
  setBarChartPlaceholder.setAttribute("id", "set-bar-ph"); // <--- TARGET TO REPLACE THE BARCHART

  board.append(cardContainer);

  setStatContainer.append(setPieChartPlaceholder);
  setStatContainer.append(setBarChartPlaceholder);

  cardContainer.append(imgCreator(imgLink));
  cardContainer.append(statBlockCreator(cardInfo));
  cardContainer.append(setStatContainer);
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


  // SET THE LIST VALUES FOR THE CARD
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
  console.log(cardSet);
  typeTotals(cardSet).then(totalBreakdown => {
    console.log(totalBreakdown);
    const typeChart = Highcharts.chart("set-pie-ph", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: `Card Types in ${cardInfo.set_name}`
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
        data: Object.entries(totalBreakdown.types).sort((a,b) => a[1] + b[1]).map(pair => {
          return {name: pair[0], y: pair[1]}
        })
      }]
    });
    // 
    // APPEND THE PIE CHART TO THE PIE TARGET HERE:
    // 
  })
}

const capitalize = str =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default cardGenerator;