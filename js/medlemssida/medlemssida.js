"use strict";

import { hamtaBetygsattaMedia } from "../../data/betygsatta-media.js";
import {
  skapaListelement,
  skapaFilterelement,
  hamtaUnikaGenrer,
  sattaBetyg,
  skapaAnvandarInformation,
} from "./funktioner.js";
import { hamtaAnvandarData } from "../huvudsida/fetch.js";
import { skapaMedlemsinfo } from "../huvudsida/funktioner.js";

//mainmetod som anropas direkt när sidan öppnas.
async function main() {
  // hämta användardata för den som är inloggad
  const anvandarData = await hamtaAnvandarData();
  skapaMedlemsinfo(anvandarData);

  skapaAnvandarInformation(anvandarData);

  //läser in lista med filmer från json-fil
  const allaHamtadeMedia = await hamtaBetygsattaMedia();

  //anropar funktion för att skapa listelement för varje film som hämtas
  skapaListelement(allaHamtadeMedia);

  //anropar metod för att räkna ut och skriva ut medelbetyg och antal filmer respektive serier i poppebild, tevebild och filmkamerabild
  sattaBetyg(allaHamtadeMedia);

  //anropar metod för att skapa radioknappar, lablar och meters för alla genrekategorier som finns representerade i filmlistan
  skapaFilterelement(allaHamtadeMedia);
}

//FUNKTIONSANROP OCH EVENTLISTENERS
main();
