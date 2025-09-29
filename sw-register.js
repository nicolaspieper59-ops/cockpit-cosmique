if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(() => {
    console.log("🔮 Médaillon cosmique hors ligne activé");
  });
}
