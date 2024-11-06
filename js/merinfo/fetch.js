const BASE_URL = "https://dsvkurs.miun.se/api";
const X_API_KEY = "qdcTq7sVnUiVUoQ7H1KhUA";

export async function hamtaDetaljeradInformation(imdbId) {
  const URI = `${BASE_URL}/Media/${imdbId}`;

  try {
    const response = await fetch(URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
    });

    const detaljInfo = await response.json();
    return detaljInfo;
  } catch (err) {
    console.error("Någonting blev fel");
  }
}

export async function sattaBetygPaMedia(imdbId, CmdbScore) {
  const URI = `${BASE_URL}/Contributions/Rate/${imdbId}/${CmdbScore}`;

  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
    });
  } catch (err) {
    console.error("Någonting blev fel");
  }
}

export async function recenseraMedia(data) {
  const URI = `${BASE_URL}/Contributions/Review`;

  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("Någonting blev fel");
  }
}
