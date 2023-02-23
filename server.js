// Importe le module express
const express = require('express');

// Importe le module path de node.js pour la gestion des chemins de fichiers
const path = require('path');

// Initialise une nouvelle instance d'express en la stockant dans la variable app
const app = express();

// Importe le module fs de node.js pour la gestion des fichiers
const fs = require('fs');

// Importe le module dotenv pour la gestion des variables d'environnement
const dotenv = require('dotenv');

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

// Indique que le répertoire "static" contient des fichiers statiques
// (CSS, images, etc.) à servir à partir de la racine du site
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// Définit une route pour l'API qui renvoie les clés d'API stockées dans les variables d'environnement
app.get('/5ki2gxl4s0', (req, res) => {
    const APIKEY1 = process.env.API_KEY_1;
    const APIKEY2 = process.env.API_KEY_2;
    const APIKEY3 = process.env.API_KEY_3;
    res.send({
        apikey1: APIKEY1,
        apikey2: APIKEY2,
        apikey3: APIKEY3
    });
});

// Définit une route pour toutes les autres demandes HTTP
app.get("/*", function(req, res) {
    // Renvoie le fichier index.html de l'application frontend
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

// Lance le serveur sur le port 8081 et affiche un message lorsque le serveur démarre
app.listen(8081, () => console.log("server running..."));
