# Card Augury

### Background and Overview

Card Augury is a data visualization project based on Magic: The Gathering, a trading card game. The game itself is now widely considered to be the world's most complex real-world game (as opposed to games that exist theoretically for game theory research). Card Augury is a project dedicated to breaking down raw data about the game (card types, sets, and secondary market prices eventually, etc.) to assist the user to predict future trends within the development of the game, and make the most out of our card purchases.

### Functionality and MVPs

Card Augury will allow users to:
- [ ] Search cards based on name
- [ ] Display a card with a breakdown of related statistics (set, rarity...)
- [ ] Breakdown sets based of certain metrics (card types, color, mana cost, etc.)

### Wireframes 

Card Augury's UX/UI experience will be minimalist and streamlined in styling, particularly at the beginning of the experience and will expand in tools and options as the user moves deeper into the site. Users will be dropped onto a splash page only consisting of a search bar, which will upon being used will animate upwards toward its final index and show positions. The overall interface will be centered directly in the middle of the screen in a landscape orientation. Card images will be displayed on the left side of interface, with visualizations of key stats found on the right side.

![wireframe](https://user-images.githubusercontent.com/56661062/80325017-81aa7c00-8801-11ea-8b71-d779b860cc59.png)

### Architecture and Technology 

- `JavaScript` will make of the overall logic.
- `Highcharts` and `Highcharts Stocks` will be used to build the data visualizations.
- `Sass` will be used for styling.
- `Scryfall API` will be used to access all card data.
- `WikiPrice API` could be used to gather pricing information on cards in the event that web scraping isn't an option (or isn't feasible).

### Implementation Timeline

**Day 1:** Setup all the initial project skeleton, bundler, webpack, and entry file. Research connecting to the `Scryfall API` and begin setting up the search functionality. Setup the backend to allow for the proper input into `Highcharts` and up to the front for rendering.

**Day 2:** Begin creating the frontend components and learn how to use `Highcharts` to display charts specifically. The goal is that this day with be dedicated solely to frontend development.

**Day 3:** Finishing the styling with `Sass`, and begin the process of upgrading the project to allow for price tracking of items through `WikiPrice API`. Begin the process of learning `Highcharts Stocks` for visualization.


### (Bonus Features)

- [ ] Line graphs will display the changing value of cards over time; achieved through external api, or web scrapping (preferred, to increase technical proficiencies).
- [ ] Cards will automatically display popular combo pieces related to given card, and these should be cultivated algorithmically based on card mechanics.
