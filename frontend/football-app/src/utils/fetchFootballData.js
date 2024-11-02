export async function fetchFootballData(endpoint) {
  console.log(`Fetching data from endpoint: ${endpoint}`);
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

    console.log(`Response Status: ${response.status}`);
    console.log(`Response URL: ${response.url}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error response: ${errorBody}`);
      throw new Error("Błąd pobierania danych");
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
