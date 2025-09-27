// Calcule l'heure solaire locale en fonction de la longitude
export function heureSolaireLocale(date, longitude) {
  const utc = date.getUTCHours() + date.getUTCMinutes() / 60;
  const décalage = longitude / 15;
  return (utc + décalage + 24) % 24;
}

// Calcule la dépression solaire (altitude négative du Soleil)
export function calculerDépressionSolaire(date, lat, lon) {
  const rad = Math.PI / 180;
  const j = date.getUTCDate() + (date.getUTCMonth() + 1) * 30.44;
  const decl = 23.44 * Math.sin(rad * (360 / 365 * (j - 81)));
  const hs = date.getUTCHours() + date.getUTCMinutes() / 60 + lon / 15;
  const ah = (hs - 12) * 15;
  const alt = Math.asin(
    Math.sin(rad * lat) * Math.sin(rad * decl) +
    Math.cos(rad * lat) * Math.cos(rad * decl) * Math.cos(rad * ah)
  );
  return -alt * (180 / Math.PI);
}

// Détermine la couleur du fond cosmique selon la dépression solaire
export function couleurSelonDépression(d) {
  if (d > 18) return "#000022";
  if (d > 12) return "#001144";
  if (d > 6)  return "#003366";
  if (d > 0)  return "#336699";
  return "#88ccff";
    }
