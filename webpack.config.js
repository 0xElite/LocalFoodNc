// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'production', // ou 'production' selon votre environnement
  entry: './app.js', // Chemin vers votre fichier app.js ou votre point d'entrée principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Répertoire de sortie (par exemple 'dist/')
    filename: 'bundle.js' // Nom du fichier de sortie bundle
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Répertoire où les fichiers statiques sont servis
    },
    open: true, // Ouvre automatiquement le navigateur
    https: false, // Configuration HTTPS si nécessaire
  },
  // Ajout d'une nouvelle règle pour copier les fichiers statiques (comme le service worker)
  // dans le répertoire de sortie ('dist/')
  plugins: [],
};
