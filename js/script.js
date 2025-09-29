// === Variables globales ===
let cockpitActif = false;
let chronoDebut = null;
let intervaleMesure = null;
let distanceTotale = 0;
let vitesseMax = 0;

// === Boutons ===
function toggleMarche() {
  cockpitActif = !cockpitActif;
  if (cockpitActif) {
    chronoDebut = Date.now();
    intervaleMesure = setInterval(() => mesurerVitesseEtGrandeurs(), 100);
  } else {
    clearInterval(intervaleMesure);
  }
}

function reinitialiserVitesseMax() {
  vitesseMax = 0;
  document.getElementById('vitesse-max').textContent = '0.0000';
}

// === Mesure des grandeurs ===
function mesurerVitesseEtGrandeurs() {
  const now = Date.now();
  const temps = (now - chronoDebut) / 1000;
  const vitesse = obtenirVitesseCapteur(); // km/h

  distanceTotale += vitesse * 1000 / 3600 * 0.1;
  vitesseMax = Math.max(vitesseMax, vitesse);

  document.getElementById('vitesse-instantanee').textContent = vitesse.toFixed(4);
  document.getElementById('vitesse-moyenne').textContent = (distanceTotale / temps * 3.6).toFixed(4);
  document.getElementById('distance').textContent = distanceTotale.toFixed(4);
  document.getElementById('temps').textContent = temps.toFixed(2);
  document.getElementById('vitesse-max').text
