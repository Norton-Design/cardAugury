import 'babel-polyfill';

export const typeTotals = async set => {
    // return obj with all types as keys except basic lands
    const cards = set.data;
    const stats = { 
        nonBasicsTotal: 0, 
        totalSetValue: 0,
        nonPromoTopTen: [],
        totalSetValueAverage: 0,
        types: {}
    };

    for (let i = 0; i < cards.length; i++){
        const card = cards[i];
        let subTypes;
        // REMOVE PROMO CARDS FROM THE POOL BECAUSE THEY'RE DUPES
        if (card.promo){
            continue;
        }

        subTypes = typeLineParser(card.type_line); // <-- 

        if (subTypes.includes('Basic')){
            continue;
        } else {
            const cardValue = (typeof card.prices.usd === "undefined" || card.prices.usd === null) ? 0 : parseFloat(card.prices.usd)

            subTypes.forEach(type => {
                if (typeof stats.types[type] === 'undefined'){
                    stats.types[type] = 0
                }
                stats.types[type] += 1
            });
            stats.nonBasicsTotal += 1;
            stats.totalSetValue += cardValue;

            if (stats.nonPromoTopTen.length < 10){
                stats.nonPromoTopTen.push(card)
            }
        }
    }

    stats.nonPromoTopTenValueAverage = cardAverager(stats.nonPromoTopTen);
    stats.totalSetValueAverage = stats.totalSetValue / stats.nonBasicsTotal;

    return stats
}

const cardAverager = cardArr => {
    let total = 0;
    cardArr.forEach(card => total += parseFloat(card.prices.usd))
    return total / cardArr.length;
}

const typeLineParser = typeLineStr => {
    const typeArr = typeLineStr.split(' ')
    return typeArr.filter(type => type.length > 2)
}

const highchartsDigest = (stats) => {
    //check highcharts for formatting...
}

// document.addEventListener('DOMContentLoaded', function () {
//     var myChart = Highcharts.chart('container', {
//         chart: {
//             type: 'bar'
//         },
//         title: {
//             text: 'Top Ten in {SET NAME}'
//         },
//         xAxis: {
//             categories: ['Apples', 'Bananas', 'Oranges']
//         },
//         yAxis: {
//             title: {
//                 text: 'USD'
//             }
//         },
//         series: [{
//             name: 'Jane',
//             data: [1, 0, 4]
//         }, {
//             name: 'John',
//             data: [5, 7, 3]
//         }]
//     });
// });