import { toggleMarche, reinitialiserVitesseMax } from './modules/vitesse.js';
import { activerOrientation } from './modules/orientation.js';
import { dessinerMedaillon } from './modules/medaillon.js';
import { chargerConstellations } from './modules/constellations.js';
import { afficherCapteurs } from './modules/capteurs.js';
import { miseAJourQuandConnecte } from './modules/miseAJour.js';

window.onload = () => {
  activerOrientation();
  afficherCapteurs();
  dessinerMedaillon();
  chargerConstellations();
  miseAJourQuandConnecte();
};
