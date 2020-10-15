
import { routes } from "./routes"
import { PageList } from "./PageList"


import "../sass/styles.scss";
import 'bootstrap';


let pageArgument;
let search = document.getElementsByClassName("search_icon")[0];
let input = document.getElementsByClassName("search_input")[0];
let showMore = document.getElementsByClassName("showMore")[0];
let platformSelect = document.getElementById("platform-select");
let page = 1;



const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

function searchGame(e) {
  e.preventDefault();
  var inputValue = input.value;
  location.href = `#pagelist/${inputValue}`;
};

search.addEventListener("click", searchGame);


const loadMoreGames = () => {
let moreArticles = "";

let path = window.location.hash.substring(1).split("/");
page += 1;
pageArgument = path[1] || "";
let cleanedArgument = pageArgument.replace(/\s+/g, "-");


const fetchMoreList = (url, pageArgument) => {

  let finalURL = `https://api.rawg.io/api/games?dates=2020-10-15,2021-10-15&ordering=-added&page_size=9&page=${page}`;
  if (pageArgument) {
    finalURL = url + "?search=" + pageArgument + "&page_size=9&page=" + page;
  }

  fetch(`${finalURL}`)
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach((article) => {
        moreArticles += `
                    <div class="card">
                    <div class="imagecontainer">
                    <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
                    <div class="text-card">
                      <h3>${article.released}</h3>
                      <h3>Genres: ${article.genres.map(genre => {
                          return `${genre.name}`
                        }).join('    ')}
                      </h3>
                      <h3>Rating: ${article.rating} over ${article.ratings_count} votes</h3>
                    </div>
                    </div>
                    <div class="card-body">
                      <a href = "#pagedetail/${article.id}" class="card-title h3">${article.name}</a>
                      <p>${article.platforms.map(platform => {
                          if (platform.platform.slug === "pc"){return `<img src="./src/images/windows.svg" class="logo">`}
                          else if (platform.platform.slug === "playstation4"){return `<img src="./src/images/ps4.svg" class="logo">`}
                          else if (platform.platform.slug === "xbox-one"){return `<img src="./src/images/xbox.svg" class="logo">`}
                          else if (platform.platform.slug === "nintendo-switch"){return `<img src="./src/images/switch.svg" class="logo">`}
                          else if (platform.platform.slug === "playstation5" || platform.platform.slug === "xbox-series-x"){return ""}
                          else if (platform.platform.slug === "linux"){return `<img src="./src/images/linux.svg" class="logo">`}
                          else if (platform.platform.slug === "ios" || platform.platform.slug === "android"){return `<img src="./src/images/mobile.svg" class="logo">`}
                          else {return `${platform.platform.name}`}
                        }).join('   ')}
                      </p> 
                    </div>
                  </div>`
      });
      document.querySelector(".page-list .row").innerHTML += moreArticles;
    });
  };
  fetchMoreList("https://api.rawg.io/api/games", cleanedArgument);

  if (page >= 3) {
    showMore.style.visibility = "hidden";
  }
};


showMore.addEventListener('click', loadMoreGames)




platformSelect.addEventListener('change', (event) => {
  PageList(input.value, event.target.value);
})