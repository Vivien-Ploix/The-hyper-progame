let page = 0;
let showMore = document.getElementsByClassName("showMore")[0];
let pageArgumentLoader;

const PageList = (argument = "", select = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";
    page = 1;

    const fetchList = (url, argument) => {

      let finalURL = `https://api.rawg.io/api/games?dates=2020-10-15,2021-10-15&ordering=-added&page_size=9&page=${page}`;
      if (argument) {
        finalURL = url + "?search=" + argument + "&page_size=9&page=" + page;
      }

      if (select) {
        finalURL = finalURL + `&platforms=${select}`
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            // console.log(article)
            articles += `
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
          document.querySelector(".page-list .row").innerHTML = articles;
      });
    };
    fetchList("https://api.rawg.io/api/games", cleanedArgument);
    
    

    showMore.innerHTML = `
    <button class="btn btn-secondary btn-lg" id="more">Show More</button>
    `;
    showMore.style.visibility = "visible";
    showMore.style.position = "initial";



  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="row" id="gamescontainer">...loading</div>
      </section>
    `;

    preparePage();
  };


  render();
};


export {PageList};
