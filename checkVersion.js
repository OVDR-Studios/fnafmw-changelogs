// JavaScript to check for a new version
setInterval(() => {
  fetch('/version.txt')
    .then(response => response.text())
    .then(serverVersion => {
      const localVersion = localStorage.getItem('currentVersion');
      if (!localVersion || serverVersion.trim() !== localVersion.trim()) {
        localStorage.setItem('currentVersion', serverVersion.trim());
        alert('A new version of this site is available. Please refresh your browser.');
      }
    })
    .catch(error => console.error('Error fetching version:', error));
}, 60000); // Checks every 60 seconds
