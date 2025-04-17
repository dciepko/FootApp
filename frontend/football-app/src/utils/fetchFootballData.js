export async function fetchFootballData(endpoint) {
  const baseUrl = "http://localhost:5156";
  const url = `${baseUrl}/api/APIFootball`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endpoint),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error response: ${errorBody}`);
      throw new Error("Błąd pobierania danych");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
