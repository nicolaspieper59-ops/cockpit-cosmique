let marche = true;
let vitesseInstantanee = 0;
let vitesseMoyenne = 0;
let distanceMetres = 0;
let tempsEcoule = 0;
let vitesseMax = 0;

// Contrôles
function toggleMarche() {
  marche = !marche;
  console.log("Marche :", marche);
}

function reinitialiserVitesseMax() {
  vitesseMax = 0;
  document.getElementById('vitesse-max').textContent = '0.0000';
}

// Horloge Minecraft
function miseAJourHorloge() {
  const now = new Date();
  const heures = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const secondes = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('horloge-minecraft').textContent = `${heures}:${minutes}:${secondes}`;
}

// Vitesse et distance
function miseAJourVitesse(nouvelleVitesseKmH) {
  const nouvelleVitesseMS = nouvelleVitesseKmH / 3.6;
  vitesseInstantanee = nouvelleVitesseKmH;
  vitesseMax = Math.max(vitesseMax, nouvelleVitesseKmH);
  distanceMetres += nouvelleVitesseMS;
  tempsEcoule += 1;
  vitesseMoyenne = (distanceMetres / tempsEcoule) * 3.6;

  document.getElementById('vitesse-instantanee').textContent = vitesseInstantanee.toFixed(4);
  document.getElementById('vitesse-moyenne').textContent = vitesseMoyenne.toFixed(4);
  document.getElementById('distance').textContent = distanceMetres.toFixed(4);
  document.getElementById('temps').textContent = tempsEcoule.toFixed(2);
  document.getElementById('vitesse-max').textContent = vitesseMax.toFixed(4);
}

// Conversions cosmique
function convertirEtAfficher() {
  const vitesseMm = vitesseInstantanee * 1000000 / 3600;
  const distanceKm = distanceMetres / 1000;
  const distanceSecLumiere = distanceMetres / 299792458;
  const distanceAnneeLumiere = distanceMetres / 9.461e+15;
  const coordsMinecraft = `X:${Math.floor(distanceMetres)} Y:64 Z:0`;

  document.getElementById('vitesse-mm').textContent = vitesseMm.toFixed(2);
  document.getElementById('distance-km').textContent = distanceKm.toFixed(2);
  document.getElementById('distance-sec-lumiere').textContent = distanceSecLumiere.toFixed(6);
  document.getElementById('distance-annee-lumiere').textContent = distanceAnneeLumiere.toExponential(2);
  document.getElementById('coords-minecraft').textContent = coordsMinecraft;

  const pourcentageLumiere = (vitesseInstantanee / 299792.458) * 100;
  const pourcentageSon = (vitesseInstantanee * 1000 / 343) * 100;
  document.getElementById('pourcentage-lumiere').textContent = pourcentageLumiere.toFixed(2);
  document.getElementById('pourcentage-son').textContent = pourcentageSon.toFixed(2);
}

// Capteurs
function inclinaison() {
  return (Math.random() * 10 - 5).toFixed(2);
}
function capteurLumiere() {
  return (Math.random() * 1000).toFixed(0);
}
function capteurSon() {
  return (30 + Math.random() * 70).toFixed(0);
}
function afficherCapteurs() {
  document.getElementById('niveau-bulle').textContent = inclinaison();
  document.getElementById('lux').textContent = capteurLumiere();
  document.getElementById('db').textContent = capteurSon();
}

// Soleil & Lune
function calculHeureSolaireVraie(longitude) {
  const now = new Date();
  const minutes = now.getUTCMinutes() + now.getUTCHours() * 60;
  const correction = longitude * 4;
  return ((minutes + correction) / 60).toFixed(2);
}
function calculHeureSolaireMoyenne() {
  const now = new Date();
  return (now.getHours() + now.getMinutes() / 60).toFixed(2);
}
function calculEquationDuTemps(longitude) {
  return (calculHeureSolaireVraie(longitude) - calculHeureSolaireMoyenne()).toFixed(2);
}
function calculCulmination(corps) {
  return corps === 'soleil' ? '12:00' : '00:00';
}
function calculPhaseLunaire() {
  return (Math.random() * 100).toFixed(1);
}
function calculMagnitudeLunaire() {
  return (-12 + Math.random() * 2).toFixed(2);
}
function calculLever(corps) {
  return corps === 'lune' ? '18:00' : '06:00';
}
function calculCoucher(corps) {
  return corps === 'lune' ? '06:00' : '18:00';
}
function afficherSoleilLune(longitude) {
  document.getElementById('culmination-soleil').textContent = calculCulmination('soleil');
  document.getElementById('culmination-lune').textContent = calculCulmination('lune');
  document.getElementById('heure-solaire-vraie').textContent = calculHeureSolaireVraie(longitude);
  document.getElementById('heure-solaire-moyenne').textContent = calculHeureSolaireMoyenne();
  document.getElementById('equation-temps').textContent = calculEquationDuTemps(longitude);
  document.getElementById('phase-lune').textContent = calculPhaseLunaire();
  document.getElementById('magnitude-lune').textContent = calculMagnitudeLunaire();
  document.getElementById('lever-lune').textContent = calculLever('lune');
  document.getElementById('coucher-lune').textContent = calculCoucher('lune');
}

// Boussole
function orientationCap() {
  return Math.floor(Math.random() * 360);
}
function gpsLatitude() {
  return 43.6119;
}
function gpsLongitude() {
  return 3.8777;
}
function calculCap(destination) {
  return Math.floor(Math.random() * 360);
}
function calculCapCeleste(corps) {
  return corps === 'lune' ? 135 : 90;
}
function fusionnerCaps() {
  return `Lune: ${calculCapCeleste('lune')}° | Destination: ${calculCap('destination')}°`;
}
function afficherBoussole() {
  document.getElementById('cap').textContent = orientationCap();
  document.getElementById('latitude').textContent = gpsLatitude();
  document.getElementById('longitude').textContent = gpsLongitude();
  document.getElementById('cap-destination').textContent = calculCap('destination');
}

// Compteurs
function calculerFrequence() {
  return Math.random() * 100;
}
function capteurMagnetique() {
  return 30 + Math.random() * 10;
}
function afficherCompteurs() {
  document.getElementById('compteur-hz').textContent = calculerFrequence().toFixed(2);
  document.getElementById('champ-magnetique').textContent = capteurMagnetique().toFixed(1);
}

// Médaillon céleste
function dessinerMedaillon() {
  const canvas = document.getElementById('medaillon-celeste');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(150, 150, 140, 0, 2 * Math.PI);
  ctx.strokeStyle = '#00ffff';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(150, 150, 140, Math.PI, 2 * Math.PI);
  ctx.strokeStyle = '#ffcc00';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(150, 150, 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '12px monospace';
  ctx.fillText("☀️", 140, 50);
  ctx.fillText("🌙", 160, 60);
  ctx.fillText("♃", 120, 80);
  ctx.fillText("♄", 180, 80);
  ctx.fillText("Orion", 100
