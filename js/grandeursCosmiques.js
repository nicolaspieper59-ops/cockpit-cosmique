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

  if (vitesse > vitesseMax) vitesseMax = vitesse;

  document.getElementById("vitesse").innerHTML = `
    <h2>Vitesse</h2>
    <p>Instantanée : ${vitesse.toFixed(2)} km/h</p>
    <p>Max : ${vitesseMax.toFixed(2)} km/h</p>
  `;

  document.getElementById("distance").innerHTML = `
    <h2>Distance</h2>
    <p>${distance.toFixed(2)} m</p>
    <p>${(distance/1000).toFixed(2)} km</p>
  `;
}

// Boutons
window.toggleVitesse = () => { vitesseActive = !vitesseActive; };
window.toggleDistance = () => { distanceActive = !distanceActive; };
window.resetVitesseMax = () => { vitesseMax = 0; };
