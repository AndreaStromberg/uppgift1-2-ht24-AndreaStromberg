//funktion som skapar listelement för varje film som finns i listan som hämtas
export function skapaListelement(hamtadeMedia) {
  const filmlista = document.getElementById("filmlista");
  filmlista.innerHTML = "";

  hamtadeMedia.forEach((film) => {
    // Skapa ett li-element för varje film
    let li = document.createElement("li");
    li.setAttribute("class", "medlemssida-filmkort");

    // Skapa ett img-element, filmposter för varje film/listelement
    let img = document.createElement("img");
    img.setAttribute("class", "filmposter");

    //sätter src-attributet för bilden till en länk till respektive filmposter
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original${film.poster_path}`
    );
    img.setAttribute("alt", "filmposter");
    img.setAttribute("height", "962");
    img.setAttribute("width", "641");

    // Skapa ett div-element
    let div = document.createElement("div");

    //sätter att divelementet är en klass med namnet medlemssida-filmbetyg
    div.setAttribute("class", "medlemssida-filmbetyg");

    // Skapa ikon-element
    let stjarna1 = document.createElement("i");
    let stjarna2 = document.createElement("i");
    let stjarna3 = document.createElement("i");
    let stjarna4 = document.createElement("i");
    let stjarna5 = document.createElement("i");

    //ett ikonelement för en dålig film skapas
    let daligFilm = document.createElement("i");

    // en lista med stjärnorna som skapats, för att kunna loopa igenom och göra rätt antal stjärnor gula
    let ikonArray = [stjarna1, stjarna2, stjarna3, stjarna4, stjarna5];

    //sätter classnamn på ikonelement från font awesome
    stjarna1.setAttribute("class", "fa-solid fa-star");
    stjarna2.setAttribute("class", "fa-solid fa-star");
    stjarna3.setAttribute("class", "fa-solid fa-star");
    stjarna4.setAttribute("class", "fa-solid fa-star");
    stjarna5.setAttribute("class", "fa-solid fa-star");

    daligFilm.setAttribute("class", "fa-regular fa-face-frown");

    // surgubben får ett id för att vi enklare ska kunna komma åt att styla den och göra den röd
    daligFilm.setAttribute("id", "surgubbe");

    //om betyget är mindre än 0, alltså -1 visas surgubbeikonen
    if (film.contribution.cmdb_score < 0) {
      div.appendChild(daligFilm);
    }

    //om betyget är 1 eller mer visas istället stjärnor som motsvarar betyget
    else {
      // Bestäm hur många stjärnor som ska fyllas. ||0 är med för att undvika nullvärden.
      let betyg = film.contribution.cmdb_score || 0;

      //loopar igenom listan med ikoner och ändrar färgen till gul för varje varv, ett varv motsvarar ett betyg
      for (let i = 0; i < betyg; i++) {
        ikonArray[i].style.color = "yellow";
      }

      //lägger till stjärnor i diven
      div.appendChild(stjarna1);
      div.appendChild(stjarna2);
      div.appendChild(stjarna3);
      div.appendChild(stjarna4);
      div.appendChild(stjarna5);
    }

    // Lägg till img-element till li-elementet
    li.appendChild(img);
    // Lägg till div-element till li-elementet
    li.appendChild(div);

    //lägger till listelementet vi har skapat i filmlistan
    filmlista.appendChild(li);
  });
}

//funktion som skapar radioknappar, lablar och meters för varje film/seriekategori som finns i listan som hämtas från json-filen
export function skapaFilterelement(hamtadeMedia) {
  const antalMedia = hamtadeMedia.length;

  // Skapa unika genrer från hämtade media
  const allaGenrer = hamtaUnikaGenrer(hamtadeMedia);

  let filtreringsBox = document.getElementById("medlemssida-filtrering");
  filtreringsBox.innerHTML = "";
  // console.log("--> allaGenrer BEFORE", allaGenrer)

  hamtadeMedia.forEach((media) => {
    media.genres.map((genre) => {
      let updatedGenre = allaGenrer.find((el) => el.id === genre.id);
      updatedGenre = { ...updatedGenre, amount: ++updatedGenre.amount };
    });
  });

  // console.log("--> allaGenrer AFTER", allaGenrer)

  // loopar igenom listan med kategorier och skapar filterringselement för varje kategori som finns
  allaGenrer.forEach((genre) => {
    let kategoriNamn = genre.name.split(" ")[0];

    filtreringsBox.innerHTML += `
      <div class="filter">
        <div class="filter-button">
          <label for="${kategoriNamn}">${kategoriNamn}</label>
          <progress id="${kategoriNamn}" value=${genre.amount} min="0" max="${antalMedia}">${genre.amount}</meter>
        </div>
      </div>
    `;
  });

  //lyssnar av vilken radiobutton som klickas i
  const allaFilterTyper = document.querySelectorAll("progress");
  allaFilterTyper.forEach((filter) => {
    filter.addEventListener("click", (event) =>
      filtreraFilmer(hamtadeMedia, event)
    );
  });
}

function uppdateraFilterElement(filtreradeFilmer) {
  const allaFilterTyper = document.querySelectorAll("progress");
  const allaGenrer = hamtaUnikaGenrer(filtreradeFilmer);

  filtreradeFilmer.forEach((media) => {
    media.genres.map((genre) => {
      let updatedGenre = allaGenrer.find((el) => el.id === genre.id);
      updatedGenre = { ...updatedGenre, amount: ++updatedGenre.amount };
    });
  });

  allaFilterTyper.forEach((filter) => {
    const progressId = filter.getAttribute("id");
    let found = false;

    allaGenrer.forEach((genre) => {
      let kategoriNamn = genre.name.split(" ")[0];

      if (kategoriNamn === progressId) {
        found = true;
        filter.setAttribute("value", genre.amount);
        filter.setAttribute("max", filtreradeFilmer.length);
        filter.innerText = genre.amount;
      }

      if (found === false) {
        filter.setAttribute("value", 0);
        filter.setAttribute("max", filtreradeFilmer.length);
        filter.innerText = 0;
      }
    });

    console.log("--> filter", filter, progressId);
  });
}

//funktion avgöra om en film ska visas i listan eller inte baserat på vilket filter man har valt
function hittaGenreIListan(lista, aktivFilterTyp) {
  let genreTraff = lista.find((g) => {
    let kategoriNamn = g.name.split(" ")[0];
    return kategoriNamn === aktivFilterTyp;
  });

  //om filmen ska filtreras bort returneras detta
  return genreTraff !== undefined;
}

//funktion för att filtrera filmer. Har tagit hjälp av nedanstående sidor på internet för att få till det.
// https://fjolt.com/article/javascript-multiple-elements-addeventlistener
// https://stackoverflow.com/questions/3960376/in-javascript-how-to-get-the-current-id-of-the-div-where-mouse-pointer-is
export function filtreraFilmer(hamtadeMedia, event) {
  //variabel för vilket filter man väljer, sätter "alla" som standardvärde ifall man inte väljer något annat
  const allaFilterTyper = document.querySelectorAll("progress");
  const aktivFilterTyp = event.target.id;

  let filtreradeFilmer = [];
  filtreradeFilmer = hamtadeMedia.filter((film) => {
    let genreLista = film.genres;

    //tar reda på om en film ska vara med i listan utifrån vilket filter som har valt genom att anropa metod för det
    let filmenSkaMed = hittaGenreIListan(genreLista, aktivFilterTyp);
    return filmenSkaMed;
  });

  skapaListelement(filtreradeFilmer);
  uppdateraFilterElement(filtreradeFilmer);
  // skapaFilterelement(filtreradeFilmer)
  sattaBetyg(filtreradeFilmer);
}

export function hamtaUnikaGenrer(hamtadeMedia) {
  const unikaGenrer = [];

  hamtadeMedia.forEach((media) =>
    media.genres.forEach((genre) => {
      let kategoriNamn = genre.name.split(" ")[0];

      if (unikaGenrer.find((el) => el.id === genre.id) === undefined) {
        unikaGenrer.push({ id: genre.id, name: genre.name, amount: 0 });
      }
    })
  );

  return unikaGenrer;
}

//funktion som avgör vilken poppebild som visas baserat på medelbetyg
function bestammaPoppebild(medelbetyg) {
  const poppebild = document.getElementById("poppe");

  if (medelbetyg < 0) {
    poppebild.setAttribute("src", "bilder/poppeArg.png");
  } else if (medelbetyg < 1) {
    poppebild.setAttribute("src", "bilder/poppeLedsen.png");
  } else if (medelbetyg < 2) {
    poppebild.setAttribute("src", "bilder/poppeNeutral.png");
  } else if (medelbetyg < 3) {
    poppebild.setAttribute("src", "bilder/poppeLiteGlad.png");
  } else if (medelbetyg < 4) {
    poppebild.setAttribute("src", "bilder/poppeGlad.png");
  } else {
    poppebild.setAttribute("src", "bilder/poppeSuperlycklig.png");
  }
}

//funktion för att räkna ut medelbetyg och antal filmer och serier baserat på vilket filter man väljer. Inparameter är en lista med filmer och serier som skickats med.
export function sattaBetyg(data) {
  const medelbetygAnvandare = document.getElementById(
    "medlemssida-statistikkort-siffra-poppe"
  );
  const antalBetygsattaFilmer = document.getElementById(
    "medlemssida-statistikkort-siffra-kamera"
  );
  const antalBetygsattaSerier = document.getElementById(
    "medlemssida-statistikkort-siffra-tv"
  );

  let totalBetyg = 0;
  let antalBetyg = data.length;

  let antalFilmer = 0;
  let antalSerier = 0;

  //loopar igenom listan med filmer och serier och räknar upp värdet för variablerna för antal filmer respektive serier
  data.forEach((film) => {
    if (film.media_type === "Movie") {
      antalFilmer++;
    } else if (film.media_type === "TVSeries") {
      antalSerier++;
    }

    //lägger till betyget till totalbetyget för varje film eller serie
    totalBetyg += film.contribution.cmdb_score;
  });

  //räknar ut medelbetyget baserat på sammanlagd betygspoäng och antal filmer och serier som betygsatts. toFixed för att få bara en decimal.
  let medelbetyg = (totalBetyg / antalBetyg).toFixed(1);

  //anropa funktion för att få rätt poppebild beroende på betyg
  bestammaPoppebild(medelbetyg);

  //skriver ut siffra för medelbetyg, antal filmer och antal serier i poppebild, filmkamerabild och tevebild
  medelbetygAnvandare.innerText = medelbetyg;
  antalBetygsattaFilmer.innerText = antalFilmer;
  antalBetygsattaSerier.innerText = antalSerier;
}

export function skapaAnvandarInformation(anvandarData) {
  console.log("--> anvandarData", anvandarData);

  const profilBild = document.getElementById("profilbild");
  profilBild.setAttribute("src", anvandarData.avatar);

  const profilNamn = document.querySelector(
    "#medlemssida-statistikOchRecensioner h2"
  );
  profilNamn.innerText = `${anvandarData.firstname} ${anvandarData.lastname}`;
}
