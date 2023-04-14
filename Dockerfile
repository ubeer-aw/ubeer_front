# Utilise l'image de Node.js comme image de base
FROM node:14-alpine

# Crée un répertoire de travail pour l'application
WORKDIR /app

# Copie les fichiers de l'application dans le répertoire de travail
COPY package.json .
COPY package-lock.json .

# Installe les dépendances de l'application
RUN npm ci 

COPY . .



# Expose le port 3000
EXPOSE 3000

# Démarre l'application React.js
CMD ["npm", "start"]