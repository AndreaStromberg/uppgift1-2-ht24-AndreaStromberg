"use strict";

import { sokEfterTitel } from "./fetch.js";
import { skapaSokresultatLista } from "./funktioner.js";
import { hamtaAnvandarData } from "../huvudsida/fetch.js";
import { skapaMedlemsinfo } from "../huvudsida/funktioner.js";

//mainmetod som anropas direkt när sidan öppnas.
async function main() {
  // hämta användardata för den som är inloggad
  const anvandarData = await hamtaAnvandarData();
  skapaMedlemsinfo(anvandarData);

  const sokresultat = await sokEfterTitel();
  console.log("--> sokresultat", sokresultat);

  // skapa en lista med alla sökresultat
  skapaSokresultatLista(sokresultat);
}

//FUNKTIONSANROP OCH EVENTLISTENERS
main();
