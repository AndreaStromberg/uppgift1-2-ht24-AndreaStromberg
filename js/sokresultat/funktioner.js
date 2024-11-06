// importerar funktionen skapaMindreKort för att kunna använda den. Anger sökvägen. .. betyder
//att jag backar ur denna mapp för att kunna gå in i en annan mapp

export function skapaSokresultatLista(sokresultat) {
  // skapar handtag till listan i html-filen
  const sokresultatLista = document.getElementById("sokresultat-lista");

  // tömmer eventuell gamma data från listan
  sokresultatLista.innerHTML = "";

  // loopa igenom listan som hämtats och skapa kort för varje film så det kan visas på sidan
  sokresultat.forEach((media) => {
    sokresultatLista.innerHTML += skapaSokresultatKort(media);
  });
}

function skapaSokresultatKort(media) {
  return `<li>
    <a class="lilla kort-media kort-media-link" href="/merinfo.html?imdb_id=${media.imdbID}&titel=${media.Title}&poster=${media.Poster}">

        <div class="kort-sokresultat-info">
          <h3 class="kort-sokresultat-titel">${media.Title}</h3>
          <p class="kort-sokresultat-ar">År: ${media.Year}</p>
        </div>

        <div class="kort-sokresultat-poster">
          <img class="filmposter" src="${media.Poster}" alt="filmposter" height="962" width="641" />
        </div>

    </a>
  </li>`;
}
