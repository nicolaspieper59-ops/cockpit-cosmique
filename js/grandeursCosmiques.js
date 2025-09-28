import {
  getLatitude, getLongitude, getSoleilData, getLuneData,
  getVitesse, getDistance, getAltitude, getInclinaison,
  getChampMagnetique, getFrequence, heureSolaireLocale
} from './modulesCapteurs.js';

import { activerHalo, journaliser } from './rituels.js';

let vitesseActive = true;
let distanceActive = true;
let vitesseMax = 0;

export async function afficherGrandeursCosmiques() {
  const date = new Date();
  const lat = await getLatitude();
  const lon = await getLongitude();

  const soleil = await getSoleilData(lat, lon, date);
  const lune = await getLuneData(lat, lon, date);
  const vitesse = vitesseActive ? await getVitesse() : 0;
  const distance = distanceActive ? await getDistance() : 0;
  const altitude = await getAltitude();
  const inclinaison = await getInclinaison();
  const champMagnetique = await getChampMagnetique();
  const frequenceHz = await getFrequence();

  // Mise à jour vitesse max
  if (vitesse > vitesseMax) vitesseMax = vitesse;

  // Déclenchements rituels
  if (frequenceHz > 10) {
    activerHalo("rituel");
    journaliser("frequence", frequenceHz);
  }
  if (vitesse > 20) {
    activerHalo("clarte");
    journaliser("vitesse", vitesse);
  }
  if (inclinaison > 30) {
    activerHalo("souffle");
    journaliser("inclinaison", inclinaison);
  }

  // Injection DOM
  document.getElementById("distance").innerHTML = `
    <h2>Distance</h2>
    <p>${distance.toFixed(2)} m</p>
    <p>${(distance/1000).toFixed(2)} km</p>
  `;

  document.getElementById("coordonnees").innerHTML = `
    <h2>Coordonnées Minecraft</h2>
    <p>X : ${Math.round(lon)}</p>
    <p>Y : ${altitude}</p>
    <p>Z : ${-Math.round(lat)}</p>
  `;

  document.getElementById("altitude").innerHTML = `
    <h2>Altitude</h2>
    <p>${altitude} m</p>
  `;

  document.getElementById("temps").innerHTML = `
    <h2>Horloge</h2>
    <p>${date.toLocaleTimeString()}</p>
  `;

  document.getElementById("solaire").innerHTML = `
    <h2>Soleil</h2>
    <p>Lever : ${soleil.lever}</p>
    <p>Coucher : ${soleil.coucher}</p>
    <p>Culmination : ${soleil.culmination} (${soleil.deg}°)</p>
    <p>Heure solaire locale : ${heureSolaireLocale(date, lon).toFixed(2)}</p>
  `;

  document.getElementById("lunaire").innerHTML = `
    <h2>Lune</h2>
    <p>Lever : ${lune.lever}</p>
    <p>Coucher : ${lune.coucher}</p>
    <p>Culmination : ${lune.culmination} (${lune.deg}°)</p>
  `;

  document.getElementById("frequence").innerHTML = `
    <h2>Fréquence</h2>
    <p>${frequenceHz} Hz</p>
    <p>Champ magnétique : ${champMagnetique} µT</p>
  `;

  document.getElementById("niveau").innerHTML = `
    <h2>Niveau à bulle</h2>
    <p>Inclinaison : ${inclinaison}°</p>
  `;

  document.getElementById("vitesse").innerHTML = `
    <h2>Vitesse</h2>
    <p>Instantanée : ${vitesse.toFixed(2)} km/h</p>
    <p>Max : ${vitesseMax.toFixed(2)} km/h</p>
  `;
}

// Boutons globaux
window.toggleVitesse = () => { vitesseActive = !vitesseActive; };
window.toggleDistance = () => { distanceActive = !distanceActive; };
window.resetVitesseMax = () => { vitesseMax = 0; };

// Lancement automatique
afficherGrandeursCosmiques();
setInterval(afficherGrandeursCosmiques, 5000);
