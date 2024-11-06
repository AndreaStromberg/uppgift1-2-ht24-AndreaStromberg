export function skapaToppLista(topMedias) {
  const topList = document.getElementById("top-list");
  topList.innerHTML = "";

  // läser av vilket index en film har och skapar olika framträdande kort beroende på placering genom funktionsanrop
  topMedias.forEach((media, index) => {
    if (index === 0) {
      topList.innerHTML += skapaSuperstortKort(media);
    } else if (index < 3) {
      topList.innerHTML += skapaStoraKort(media);
    } else {
      topList.innerHTML += skapaMindreKort(media);
    }
  });
}
// Funktion som skapar ett jättestort kort som visar en film. Gör hela kortet till en länk så man kan klicka på det och komma till sidan med mer info om filmen
function skapaSuperstortKort(media) {
  return `<li>
            <a class="superstort kort-media kort-media-link" href="/merinfo.html?imdb_id=${media.imdb_id}" data-imdb_id="${media.imdb_id}">
              <div class="kort-media-info">
                <h3 class="kort-media-titel-superstort">${media.title}</h3>

                <p class="tagline kort-media-tagline">${media.tagline}</p>
                <p class="kort-media-betyg">Betyg: ${media.cmdb_score}</p>
              </div>

              <div class="kort-media-poster-superstort">
                <img class="filmposter" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="filmposter" height="962" width="641" />
              </div>
            </a>
          </li>`;
}

function skapaStoraKort(media) {
  return `<li>
            <a class="stora kort-media kort-media-link" href="/merinfo.html?imdb_id=${media.imdb_id}" data-imdb_id="${media.imdb_id}">
              <div class="kort-media-info">
                <h3 class="kort-media-titel-stora">${media.title}</h3>

                <p class="tagline kort-media-tagline">${media.tagline}</p>
                <p class="kort-media-betyg">Betyg: ${media.cmdb_score}</p>
              </div>

              <div class="kort-media-poster-stora">
                <img class="filmposter" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="filmposter" height="962" width="641" />
              </div>
            </a>
          </li>`;
}

function skapaMindreKort(media) {
  return `<li>
            <a class="lilla kort-media kort-media-link" href="/merinfo.html?imdb_id=${media.imdb_id}" data-imdb_id="${media.imdb_id}">
              <div class="kort-media-info">
                <h3 class="kort-media-titel-mindre">${media.title}</h3>

                <p class="tagline kort-media-tagline">${media.tagline}</p>
                <p class="kort-media-betyg">Betyg: ${media.cmdb_score}</p>
              </div>

              <div class="kort-media-poster">
                <img class="filmposter" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="filmposter" height="962" width="641" />
              </div>
            </a>
          </li>`;
}

// funktion som ser till att det går att klicka på sökknappen i sökformuläret. Exporterar så den kan användas även på andra sidor.
export function skapaLyssnareForSokruta() {
  const sokFormular = document.getElementById("startsida-sokformular");
  sokFormular.addEventListener("submit", async function (event) {
    event.preventDefault();

    const sokstrang = event.target.sokord.value;
    window.location.href = `/sokresultat.html?sokstrang=${sokstrang}`;
  });
}

export function skapaMedlemsinfo(anvandarData) {
  const header = document.querySelector("header");

  header.innerHTML += `
  <div class="userinfo">
    <div class="userinfo-avatar">
      <img src="${anvandarData.avatar}" alt="${anvandarData.username}" width="300" height="300">
    </div>
  
    <div class="userinfo-username">
      ${anvandarData.username}
    </div>
  </div>
  `;
}
