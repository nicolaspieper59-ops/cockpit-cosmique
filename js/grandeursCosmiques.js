import {
  getLatitude, getLongitude, getSoleilData, getLuneData,
  getVitesse, getDistance, getAltitude, getInclinaison,
  getChampMagnetique, getFrequence, heureSolaireLocale
} from './modulesCapteurs.js';

export async function afficherGrandeursCosmiques() {
  const date = new Date();
  const lat = await getLatitude();
  const lon = await getLongitude();

  const soleil = await getSoleilData(lat, lon, date);
  const lune = await getLuneData(lat, lon, date);
  const vitesse = await getVitesse();
  const distance = await getDistance();
  const altitude = await getAltitude();
  const inclinaison = await getInclinaison();
  const champMagnetique = await getChampMagnetique();
  const frequenceHz = await getFrequence();

  const vitesseMs = (vitesse / 3.6).toFixed(4);
  const vitesseMm = (vitesseMs * 1000).toFixed(2);
  const pourcentLumiere = ((vitesseMs / 299792458) * 100).toFixed(8);
  const pourcentSon = ((vitesseMs / 340) * 100).toFixed(2);

  // Affichage
  document.getElementById("distance").innerHTML = `
    <h2>Distance</h2>
    <p>${distance.toFixed(2)} m</p>
    <p>${(distance/1000).toFixed(2)} km</p>
    <p>${(distance/149597870700).toExponential(4)} UA</p>
    <p>${(distance/299792458).toFixed(4)} sec lumière</p>
    <p>${(distance/9.4607e15).toExponential(4)} année lumière</p>
  `;

  document.getElementById("coordonnees").innerHTML = `
    <h2>Coordonnées Minecraft</h2>
    <p>X : ${Math.round(lon)}</p>
    <p>Y : ${altitude}</p>
    <p>Z : ${-Math.round(lat)}</p>
  `;

  document.getElementById("altitude").innerHTML = `<h2>Altitude</h2><p>${altitude} m</p>`;
  document.getElementById("temps").innerHTML = `<h2>Horloge</h2><p>${date.toLocaleTimeString()}</p>`;

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
    <p>Coucher : ${lune
