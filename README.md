# 🌌 Cockpit Cosmique

Interface immersive affichant les grandeurs cosmiques (Soleil, Lune, vitesse, distance, fréquence, inclinaison).

## 🚀 Fonctionnalités
- Affichage en temps réel des grandeurs
- Halos animés (souffle, clarté, rituel)
- Déclenchement rituel avec sons
- Journalisation et rejouabilité
- Boutons interactifs :
  - ⏻ Marche/Arrêt Vitesse
  - ⏻ Marche/Arrêt Distance
  - ↻ Réinitialiser Vitesse Max
  - ⏪ Rejouer Rituels

## 📂 Arborescence
Voir la structure dans le dossier `COCKPIT/`.

## ⚙️ Installation
1. Cloner le projet
2. Ouvrir `index.html` dans un navigateur
3. Activer les capteurs (GPS, orientation) si disponibles

## 🎛️ Utilisation
- Les boutons permettent d’activer/désactiver la collecte de vitesse et distance
- Le bouton `↻ Vitesse max` remet la valeur maximale à zéro
- Le bouton `⏪ Rejouer Rituels` rejoue les halos enregistrés

## 🔮 Extension
- Ajouter vos propres sons dans `assets/`
- Modifier les seuils dans `data/config.json`
