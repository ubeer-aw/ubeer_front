# Utilise l'image de Node.js comme image de base
FROM node:alpine

# Crée un répertoire de travail pour l'application
WORKDIR /app

# Copie le fichier .dockerignore dans le répertoire de travail
COPY .dockerignore .

# Copie les fichiers de l'application dans le répertoire de travail
COPY package.json .
COPY package-lock.json .

# Installe les dépendances de l'application
RUN npm ci --only=production \
    && npm cache clean --force \
    && rm -rf /tmp/*

# Copie les fichiers de l'application dans le répertoire de travail
COPY . .

# Expose le port 3000
EXPOSE 3000

# Démarre l'application React.js
CMD ["npm", "start"]
