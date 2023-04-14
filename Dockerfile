# Utilise une image de base plus optimisée
FROM node:slim

# Crée un répertoire de travail pour l'application
WORKDIR /app

# Copie les fichiers de l'application dans le répertoire de travail
COPY package.json .
COPY package-lock.json .

# Installe les dépendances de l'application en production
RUN npm ci --only=production \
    && npm cache clean --force \
    && rm -rf /tmp/*

# Copie les fichiers de l'application dans le répertoire de travail
COPY . .

# Exclut les fichiers inutiles avec .dockerignore
COPY .dockerignore .

# Expose le port 3000
EXPOSE 3000

# Démarre l'application React.js
CMD ["npm", "start"]
