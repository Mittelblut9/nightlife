let hasSelectedCharacter = false;

alt.on('Client:CharacterSelect:Show', (characters) => {
    // If the user doesnt have any characters, lock the other slots and only accept the first one
    if(characters.length === 0) {
        for(let i = 2; i <= 3; i++) {
            document.getElementById(`character-${i}`).style.cursor = 'not-allowed';
            document.getElementById(`character-${i}`).style.pointerEvents = 'none';

            // Remove the text
            document.querySelector(`#character-${i}-create`).remove();
            document.querySelector(`#character-${i}-name`).remove();
        }
    }else {
        characters.forEach((character, index) => {
            index++;
            const id = `character-${index}`;
            document.getElementById(id).dataset.cid = character.cid;
            document.getElementById(`${id}-name`).innerHTML = `${character.firstname} ${character.lastname}`;
            document.getElementById(`${id}-name`).classList.remove('d-none');
            document.getElementById(`${id}-create`).remove();
        });
    }
});


document.querySelectorAll('.character').forEach((character) => {
    if(hasSelectedCharacter) return;
    hasSelectedCharacter = true;

    character.addEventListener('click', (e) => {
        const cid = e.target.dataset.cid;
        if(!cid) {
            character.addEventListener('click', () => {
                alt.emit('Client:CharacterSelect:Create', character.id.split('-')[1]);
            });
            return;
        }

        alt.emit('Client:CharacterSelect:Select', cid);
    });
});