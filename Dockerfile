# Utilise l'image de Node.js comme image de base
FROM node:latest

# Crée un répertoire de travail pour l'application
WORKDIR /app

# Copie les fichiers de l'application dans le répertoire de travail
COPY package.json .
COPY package-lock.json .
COPY . .

# Installe les dépendances de l'application
RUN npm install

# Expose le port 3000
EXPOSE 3000

# Démarre l'application React.js
CMD ["npm", "start"]