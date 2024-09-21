const handleDownloadJSON = () => {
  if (!data) return;

  // Tworzenie Blob z danymi JSON
  const jsonData = JSON.stringify(data, null, 2); // Formatowanie JSON
  const blob = new Blob([jsonData], { type: "application/json" });

  // Tworzenie URL dla pliku
  const url = URL.createObjectURL(blob);

  // Tworzenie ukrytego elementu <a> do pobrania
  const link = document.createElement("a");
  link.href = url;
  link.download = "fixtures.json"; // Nazwa pliku
  document.body.appendChild(link);
  link.click();

  // Usuwanie tymczasowego linku
  link.remove();
};
