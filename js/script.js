import { activerGPS } from './modules/gps.js';
import { activerOrientation } from './modules/orientation.js';
import { afficherCapteurs } from './modules/capteurs.js';
import { dessinerMedaillon } from './modules/medaillon.js';
import { chargerConstellations } from './modules/constellations.js';
import { miseAJourQuandConnecte } from './modules/offline.js';

window.onload = () => {
  activerGPS();
  activerOrientation();
  afficherCapteurs();
  dessinerMedaillon();
  chargerConstellations();
  miseAJourQuandConnecte();
};
