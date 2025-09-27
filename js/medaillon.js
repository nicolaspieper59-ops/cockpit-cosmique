import { heureSolaireLocale, calculerDépressionSolaire, couleurSelonDépression } from './utils.js';

export function dessinerMedaillonMinecraft() {
  const canvas = document.getElementById("medaillon-minecraft");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const rayon = 140;

  const lat = 43.2965;
  const lon = 5.3698;
  const date = new Date();

  const angle = ((heureSolaireLocale(date, lon) - 12) / 24) * 2 * Math.PI;
  const dépression = calculerDépressionSolaire(date, lat, lon);
  const fond = couleurSelonDépression(dépression);

  // Fond cosmique
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = fond;
  ctx.beginPath();
  ctx.arc(cx, cy, rayon, 0, 2 * Math.PI);
  ctx.fill();

  // Cercle extérieur
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, rayon, 0, 2 * Math.PI);
  ctx.stroke();

  // Aiguille solaire
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -rayon + 20);
  ctx.stroke();
  ctx.restore();
}
