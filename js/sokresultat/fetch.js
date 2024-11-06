const BASE_URL = "http://www.omdbapi.com/?apikey="
const OMDB_API_KEY = "80ae649e"

export async function sokEfterTitel() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const sokstrang = urlParams.get("sokstrang")

  console.log("--> sokstrang", sokstrang)

  if (sokstrang === null || sokstrang === "") {
    return
  }

  const URI = `${BASE_URL}${OMDB_API_KEY}&s=${sokstrang}`

  try {
    const response = await fetch(URI)

    const sokResultat = await response.json()
    return sokResultat.Search
  } catch (err) {
    console.error("Någonting blev fel")
  }
}
