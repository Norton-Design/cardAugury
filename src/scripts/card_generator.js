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
  const setBarChartPlaceholder = document.createElement('div');
  const setPieChartPlaceholder = document.createElement('div');

  if (prevContainer) board.removeChild(prevContainer);
  
  setStatContainer.classList.add('set-stats-container');
  setBarChartPlaceholder.setAttribute("id", "set-bar-ph"); // <--- TARGET TO REPLACE THE BARCHART
  setPieChartPlaceholder.setAttribute("id", "set-pie-ph"); // <--- TARGET TO REPLACE THE PIECHART

  board.append(cardContainer);

  setStatContainer.append(setBarChartPlaceholder);
  setStatContainer.append(setPieChartPlaceholder);

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
        text: `Card Types (${cardInfo.set_name})`,
        style: {
          "font-family": "$title-font",
          "font-size": "1rem"
        }
      },
      tooltip: {
        pointFormat: '{series.name}: {point.percentage:.1f}%',
        footerFormat: '\n ({point.y})'
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
            format: '{point.name}: {point.percentage:.1f}%',
            style: {
              fontWeight: 400,
              fontFamily: "$body-font"
            }
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

    const valueChart = Highcharts.chart("set-bar-ph", {
      chart: {
        type: 'column'
    },
    title: {
        text: `Most Valued (${cardInfo.set_name})`,
        style: { 
          "font-family": "$title-font",
          "font-size": "1rem"
        }
    },
    xAxis: {
        categories: totalBreakdown.nonPromoTopTen.map(card => card.name),
        crosshair: true,
        labels: { enabled: false }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'USD'
        },
        // opposite: true
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>${point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Value',
        colorByPoint: true,
        data: totalBreakdown.nonPromoTopTen.map(card => parseFloat(card.prices.usd)),
        showInLegend: false
    }]
    });
  })
}

const capitalize = str =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default cardGenerator;