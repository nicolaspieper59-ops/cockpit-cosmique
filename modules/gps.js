function activerGPS() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);

        // Affichage dans le DOM
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;

        // Stockage local pour usage hors ligne
        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', lon);

        console.log(`📍 Position réelle : ${lat}, ${lon}`);
      },
      error => {
        console.warn('Erreur GPS :', error.message);
        document.getElementById('latitude').textContent = 'Erreur';
        document.getElementById('longitude').textContent = 'Erreur';
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  } else {
    console.warn('🌐 Géolocalisation non disponible');
    document.getElementById('latitude').textContent = 'Non disponible';
    document.getElementById('longitude').textContent = 'Non disponible';
  }
}
