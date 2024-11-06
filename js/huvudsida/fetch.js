const BASE_URL = "https://dsvkurs.miun.se/api";
const X_API_KEY = "qdcTq7sVnUiVUoQ7H1KhUA";

export async function hamtaAnvandarData() {
  const URI = `${BASE_URL}/Users/profile`;

  try {
    const response = await fetch(URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
    });

    const anvandarData = await response.json();
    return anvandarData.value;
  } catch (err) {
    console.error("Någonting blev fel");
  }
}
