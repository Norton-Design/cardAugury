import "./styles/index.scss";
import { cardSearcher } from './scripts/card_searcher';
import cardGenerator from './scripts/card_generator';

window.addEventListener("DOMContentLoaded", () => {
  const board = document.createElement("div");
  const searchBar = document.createElement("form");
  const inputField = document.createElement("input");
  const submitButton = document.createElement("button");
  const searchIcon = document.createElement("i");
  const titleContainer = document.createElement('div');
  const title = document.createElement("h1");
  const titleImg = document.createElement("img");
  const navContainer = document.createElement('div');
  const gitLinkImg = document.createElement("i");
  const linkedinLinkImg = document.createElement("i");
  const angelLinkImg = document.createElement("i");
  const gitLink = document.createElement("a");
  const linkedinLink = document.createElement("a");
  const angelLink = document.createElement("a");
  const errorsContainer = document.createElement("div");
  const instructionsContainer = document.createElement('div');
  const instructionsButton = document.createElement("i");

  instructionsContainer.classList.add('instructions-container');
  instructionsContainer.append(instructionsButton)

  errorsContainer.setAttribute('id', "errors-container");

  gitLink.append(gitLinkImg);
  gitLink.classList.add('nav-link');
  gitLink.setAttribute("href", "https://github.com/Norton-Design/cardAugury");
  gitLink.setAttribute("target", "_blank");
  gitLink.setAttribute("rel", "noopener noreferrer");
  gitLink.setAttribute('title', 'Github Repo');

  linkedinLink.append(linkedinLinkImg);
  linkedinLink.classList.add('nav-link');
  linkedinLink.setAttribute("href", "https://www.linkedin.com/in/michael-norton-5b5559199/");
  linkedinLink.setAttribute("target", "_blank");
  linkedinLink.setAttribute("rel", "noopener noreferrer");
  linkedinLink.setAttribute('title', 'Linkedin Link')

  angelLink.append(angelLinkImg);
  angelLink.classList.add('nav-link');
  angelLink.setAttribute("href", "https://angel.co/u/michael-norton-17");
  angelLink.setAttribute("target", "_blank");
  angelLink.setAttribute("rel", "noopener noreferrer");
  angelLink.setAttribute("title", "Angellist Link");

  document.body.classList.add("center");
  document.body.append(board);

  board.classList.add("board", "center");
  board.setAttribute('id', "main-board")
  board.append(instructionsContainer)
  board.append(errorsContainer);
  board.append(titleContainer)
  board.append(searchBar);
  board.append(navContainer);

  titleContainer.append(titleImg);
  titleContainer.append(title);
  titleContainer.classList.add("title-container")

  navContainer.append(gitLink);
  navContainer.append(linkedinLink);
  navContainer.append(angelLink)
  navContainer.classList.add('nav');

  titleImg.setAttribute("src", "./src/images/final-owl2.png")

  title.innerHTML = "Card Augury";

  searchIcon.classList.add("fa");
  searchIcon.classList.add("fa-search");

  linkedinLinkImg.classList.add('fa');
  linkedinLinkImg.classList.add('fa-linkedin');

  gitLinkImg.classList.add('fa');
  gitLinkImg.classList.add('fa-github');

  angelLinkImg.classList.add('fa');
  angelLinkImg.classList.add('fa-angellist');

  submitButton.append(searchIcon);
  submitButton.classList.add('search-button');

  instructionsButton.classList.add("fa");
  instructionsButton.classList.add("fa-bars");

  inputField.setAttribute("id", "searchbar");
  inputField.setAttribute("placeholder", "Search for a card...");
  inputField.classList.add("searchbar");

  searchBar.classList.add("searchbar-container");
  searchBar.append(inputField);
  searchBar.append(submitButton);

  const modal = document.getElementById("modal");
  const span = document.getElementsByClassName("close")[0];

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  instructionsButton.onclick = function() {
    modal.style.display = "block";
  }

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    
    cardSearcher()
      .then(card => {
        const navCon = document.getElementsByClassName("nav")[0];
        if (navCon) {
          board.removeChild(navContainer)
        }
        cardGenerator(card);
        board.append(navContainer)

        if (card.object) {
          board.style.margin = "0 5rem 0 rem 5rem";
          board.style.minHeight = 'inherit';
        }
        instructionsContainer.style.margin = "1.2rem 0";
      })
      // .then(() => board.append(navContainer))
  })
});

