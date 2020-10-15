let showMore = document.getElementsByClassName("showMore")[0];


const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let { name, background_image, description, released, genres, tags, website, clip, rating, ratings_count, developers, stores } = response;
          let articleDOM = document.querySelector(".page-detail .article");
          let jumbotron = document.querySelector(".hero-image");
          let article = document.getElementsByClassName("article")[0];
          jumbotron.style.backgroundImage = `url('${background_image}')`;
          pageContent.innerHTML = `
            <section class="page-detail">
              <div class="article">
                <h1 class="title mb-5">${name}</h1>
                <p class="release-date mb-3">Release date : <span>${released}</span></p>
                <p class="description mb-5">${description}</p>
                <a href="${website}" class="btn btn-primary my-4">Site Web</a>
                <h5 class="mb-5">Rating: ${rating}, over ${ratings_count} votes</h5>
                <p class="text-muted mb-5">${genres.map(genre => {
                  return `<a class="btn btn-info" href='#pagelist/${genre.slug}'>${genre.name}</a>`
                }).join(' ')}
                </p> 
                <p class="text-muted mb-5">${tags.map(tag => {
                  return `<a href='#pagelist/${tag.slug}'>${tag.name} /</a>`
                }).join(' ')}
                </p> 
                <p class="text-muted mb-5">${developers.map(developer => {
                  return `<a class="btn btn-danger" href='#pagelist/${developer.slug}'>${developer.name}</a>`
                  }).join(' ')}
                </p> 
                <h4>Acheter :</h4>
                <p class="text-muted mb-5">${stores.map(store => {
                  return `<a class="btn btn-warning" href='${store.url}'>${store.store.name}</a>`
                  }).join(' ')}
                </p> 
              </div>
            </section>
            <div id="screens"></div>
            <div class="video"></div>
            <h2 style="color: red" class="similar-title">Similar Games</h2>
            <div class="similar"></div>

          `;
          if (clip){
            let video = document.getElementsByClassName("video")[0];
            video.innerHTML += `
            <h2 style="color: red" class="mb-4">Teaser</h2>
            <video controls="controls" src="${clip.clip}"></video>`};
          let screens = document.getElementById("screens")
          fetch(`${finalURL}/screenshots`)
            .then((response) => response.json())
            .then((response) => {
              let screenShots = response.results.slice(0, 4)
              screenShots.forEach((screen) => {
                screens.insertAdjacentHTML("beforeend", `
                <img src='${screen.image}' alt="game'screenshot" class="screenshot">
                `)
              })
            })
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    showMore.style.position = "absolute";
        showMore.innerHTML = "";

    fetch(`https://api.rawg.io/api/games/${cleanedArgument}/suggested`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let similar = document.getElementsByClassName("similar")[0];
        let similarGames = data.results.slice(0,6)
        similarGames.forEach((game) => {
          similar.insertAdjacentHTML("beforeend", `
                  <div class="card">
                    <div class="imagecontainer">
                    <img class="card-img-top" src="${game.background_image}" alt="Card image cap">
                    <div class="text-card">
                      <h3>${game.released}</h3>
                      <h3>Genres :${game.genres.map(genre => {
                          return `${genre.name}`
                        }).join('    ')}
                      </h3>
                      <h3>Rating: ${game.rating} over ${game.ratings_count} votes</h3>
                    </div>
                    </div>
                    <div class="card-body">
                      <a href = "#pagedetail/${game.id}" class="card-title h3">${game.name}</a>
                      <p>${game.platforms.map(platform => {
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
                  </div>`)  
        })

      })

  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};


export {PageDetail};