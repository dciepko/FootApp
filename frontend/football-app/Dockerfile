# Wybierz oficjalny obraz Node.js jako podstawę
FROM node:18-alpine

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki konfiguracyjne npm
COPY package.json package-lock.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę aplikacji
COPY . .

# Otwórz port 3000, na którym działa aplikacja React
EXPOSE 5173

# Uruchom aplikację React w trybie deweloperskim
CMD ["npm", "run", "dev"]
