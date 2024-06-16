document.addEventListener('DOMContentLoaded', function() {
    const versionUrl = '/version.json';  // URL to your version file
    let localVersion = localStorage.getItem('siteVersion');

    async function checkVersion() {
        try {
            const response = await fetch(versionUrl);
            const data = await response.json();
            const remoteVersion = data.version;

            if (localVersion !== remoteVersion) {
                console.log('New version available');
                // Notify user to refresh
                notifyUserToUpdate();
                // Update local version
                localStorage.setItem('siteVersion', remoteVersion);
            }
        } catch (error) {
            console.error('Error fetching version:', error);
        }
    }

    function notifyUserToUpdate() {
        const notification = document.createElement('div');
        notification.innerHTML = 'New update available. <a href="javascript:window.location.reload(true)">Refresh</a> to update.';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'lightblue';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        document.body.appendChild(notification);
    }

    // Run check version on load and every 5 minutes
    checkVersion();
    setInterval(checkVersion, 300000); // 300000 milliseconds = 5 minutes
});
