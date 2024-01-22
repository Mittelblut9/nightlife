alt.on('Client:SpawnSelect:Show', (lastPosition) => {

    if(!lastPosition) {
        document.getElementById('spawnpoint-1').classList.add('pe-none');
        document.getElementById('spawnpoint-1').style.opacity = '0.5';
        document.getElementById('spawnpoint-1').style.cursor = 'not-allowed';
    }

    document.querySelectorAll('.spawnpoint').forEach(point => {
        point.addEventListener('click', () => {
            const spawnPoint = point.id.split('-')[1];
            alt.emit('Client:SpawnSelect:Select', spawnPoint);
        });
    });
});