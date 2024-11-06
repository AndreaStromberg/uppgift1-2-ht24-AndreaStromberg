"use strict";

import {
  visaDetaljeradInformation,
  laggTillSubmitListenerForForm,
} from "./funktioner.js";
import { hamtaAnvandarData } from "../huvudsida/fetch.js";
import { skapaMedlemsinfo } from "../huvudsida/funktioner.js";

//mainmetod som anropas direkt när sidan öppnas.
async function main() {
  // hämta användardata för den som är inloggad
  const anvandarData = await hamtaAnvandarData();
  skapaMedlemsinfo(anvandarData);

  await visaDetaljeradInformation();

  laggTillSubmitListenerForForm();
}

//FUNKTIONSANROP OCH EVENTLISTENERS
main();
