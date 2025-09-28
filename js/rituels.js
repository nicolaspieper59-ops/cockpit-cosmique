export function activerHalo(type) {
  const halo = document.getElementById(`halo_${type}`);
  if (halo) {
    halo.classList.add('active');
    jouerSonRituel(type);
    setTimeout(() => halo.classList.remove('active'), 5000);
  }
}

export function jouerSonRituel(type) {
  const audio = new Audio(`assets/${type}.mp3`);
  audio.play();
}

export function journaliser(grandeur, valeur) {
  const entry = { grandeur, valeur, date: new Date().toISOString() };
  let journal = JSON.parse(localStorage.getItem("journal")) || [];
  journal.push(entry);
  localStorage.setItem("journal", JSON.stringify(journal));
}

export function rejouerRituels() {
  const journal = JSON.parse(localStorage.getItem("journal")) || [];
  journal.forEach((entry, i) => {
    setTimeout(() => activerHalo("rituel"), i * 2000);
  });
}
