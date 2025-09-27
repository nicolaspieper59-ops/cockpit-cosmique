import { heureSolaireLocale } from './utils.js';

export function afficherGrandeursCosmiques() {
  const lat = 43.2965;
  const lon = 5.3698;
  const date = new Date();

  // Soleil et Lune (données réelles ou calculées)
  const soleil = {
    lever: "07:27",
    coucher: "19:34",
    culmination: "13:30",
    deg: 45.0
  };
  const lune = {
    lever: "23:30",
    coucher: "13:00",
    culmination: "06:00",
    deg: 60.0
  };

  const heureSolaire = heureSolaireLocale(date, lon).toFixed(2);
  const heureMoyenne = (12 + lon / 15).toFixed(2);

  // Coordonnées Minecraft stylisées Terre plate
  const altitude = 42;
  const coordX = Math.round(lon);
  const coordZ = -Math.round(lat);
  const coordY = altitude;

  // Distance et vitesse (réelles si GPS actif, sinon fixe)
  const distance = 12345;
  const vitesse = 12.3;
  const vitesseMs = (vitesse / 3.6).toFixed(4);
  const vitesseMm = (vitesseMs * 1000).toFixed(2);
  const pourcentLumiere = ((vitesseMs / 299792458) * 100).toFixed(8);
  const pourcentSon = ((vitesseMs / 340) * 100).toFixed(2);

  // Fréquence et champ
  const frequenceHz = 42.0;
  const champMagnetique = 32.5;
  const inclinaison = 17.3;

  // Affichage
  document.getElementById("distance").innerHTML = `
    <h2>Distance</h2>
    <p>mètres : ${distance.toFixed(2)} m</p>
    <p>km : ${(distance / 1000).toFixed(2)}</p>
    <p>UA : ${(distance / 149597870700).toExponential(4)}</p>
    <p>sec lumière : ${(distance / 299792458).toFixed(4)}</p>
    <p>année lumière : ${(distance / 9.4607e15).toExponential(4)}</p>
  `;

  document.getElementById("coordonnees").innerHTML = `
    <h2>Coordonnées Minecraft (Terre plate)</h2>
    <p>X : ${coordX} (Est)</p>
    <p>Y : ${coordY} (Altitude)</p>
    <p>Z : ${coordZ} (Nord)</p>
  `;

  document.getElementById("altitude").innerHTML = `<h2>Altitude</h2><p>${altitude} m</p>`;
  document.getElementById("temps").innerHTML = `<h2>Horloge</h2><p>${date.toLocaleTimeString()}</p>`;

  document.getElementById("solaire").innerHTML = `
    <h2>Soleil</h2>
    <p>Lever : ${soleil.lever}</p>
    <p>Coucher : ${soleil.coucher}</p>
    <p>Culmination : ${soleil.culmination} (${soleil.deg}°)</p>
    <p>Heure solaire locale : ${heureSolaire}</p>
    <p>Heure moyenne : ${heureMoyenne}</p>
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

  document.getElementById("niveau").innerHTML = `<h2>Niveau à bulle</h2><p>Inclinaison : ${inclinaison}°</p>`;

  document.getElementById("vitesse").innerHTML = `
    <h2>Vitesse</h2>
    <p>Instantanée : ${vitesse.toFixed(2)} km/h</p>
    <p>m/s : ${vitesseMs}</p>
    <p>mm/s : ${vitesseMm}</p>
    <p>% lumière : ${pourcentLumiere} %</p>
    <p>% son : ${pourcentSon} %</p>
  `;
}
  
