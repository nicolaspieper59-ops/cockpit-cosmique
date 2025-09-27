export function setupCommandes() {
  // Orientation
  window.addEventListener("deviceorientation", e => {
    const azimut = e.alpha?.toFixed(2);
    const inclinaison = e.beta?.toFixed(2);
    document.getElementById("orientation").innerHTML = `
      <h2>Orientation</h2>
      <p>Azimut : ${azimut}°</p>
      <p>Inclinaison : ${inclinaison}°</p>
    `;
  });

  // GPS
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude.toFixed(4);
      const lon = pos.coords.longitude.toFixed(4);
      const alt = pos.coords.altitude?.toFixed(2) || "inconnue";
      document.getElementById("gps").innerHTML = `
        <h2>GPS</h2>
        <p>Latitude : ${lat}</p>
        <p>Longitude : ${lon}</p>
        <p>Altitude : ${alt} m</p>
        <p>Précision : ${pos.coords.accuracy.toFixed(2)} m</p>
      `;
    }, () => {
      document.getElementById("mode-souterrain").innerHTML = `
        <h2>Mode souterrain</h2>
        <p>GPS non disponible</p>
      `;
    });
  }

  // Lumière ambiante
  if ("AmbientLightSensor" in window) {
    const sensor = new AmbientLightSensor();
    sensor.addEventListener("reading", () => {
      document.getElementById("lumiere").innerHTML = `
        <h2>Lumière</h2>
        <p>${sensor.illuminance.toFixed(2)} lux</p>
      `;
    });
    sensor.start();
  }

  // Son ambiant
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    const source = ctx.createMediaStreamSource(stream);
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    setInterval(() => {
      analyser.getByteFrequencyData(data);
      const volume = data.reduce((a, b) => a + b) / data.length;
      document.getElementById("son").innerHTML = `
        <h2>Son</h2>
        <p>${volume.toFixed(2)} dB</p>
      `;
    }, 500);
  });

  // Boutons (optionnels)
  document.getElementById("toggle-vitesse").onclick = () => {
    const el = document.getElementById("vitesse");
    el.style.display = el.style.display === "none" ? "block" : "none";
  };

  document.getElementById("reset-vmax").onclick = () => {
    document.getElementById("vitesse").innerHTML = `<h2>Vitesse</h2><p>Réinitialisée</p>`;
  };
}
