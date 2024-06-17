// Importations nécessaires
import { BrowserBarcodeReader } from '@zxing/library';
import axios from 'axios';

// Sélection des éléments du DOM
const scanButton = document.getElementById('scanButton');
const contentDiv = document.getElementById('content');

// Création d'une instance de BrowserBarcodeReader
let codeReader = new BrowserBarcodeReader();

// Écouteur d'événement pour le bouton de scan
scanButton.addEventListener('click', async () => {
  try {
    // Décode le code-barres à partir de la caméra
    const codeResult = await codeReader.decodeFromInputVideoDevice(undefined, 'video');

    console.log('Code-barres détecté:', codeResult.text);

    // Appel à l'API d'OpenFoodFacts pour récupérer les informations du produit
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${codeResult.text}.json`)
      .then(response => {
        const product = response.data.product;
        console.log('Informations du produit:', product);

        // Construction des détails du produit pour affichage dans l'interface
        const productDetails = `
          <h2>${product.product_name}</h2>
          <img src="${product.image_url}" alt="Image du produit">
          <p>Catégorie: ${product.categories}</p>
          <p>Marque: ${product.brands}</p>
          <p>Quantité: ${product.quantity}</p>
        `;

        // Afficher les détails du produit dans l'interface
        contentDiv.innerHTML = productDetails;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations du produit:', error);
        // Afficher un message d'erreur dans l'interface si nécessaire
      });

  } catch (err) {
    console.error('Erreur lors du scan du code-barres:', err);
    // Gérer l'erreur et afficher un message à l'utilisateur si nécessaire
  }
});

// Enregistrement du service worker lorsque la page est chargée
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
