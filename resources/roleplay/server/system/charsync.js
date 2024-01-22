import * as alt from 'alt-server';
import CharPos from '~server/_classes/Char/CharPos.js';
import * as meta from '~shared/meta.js';
import errorhandler from './errorhandler/errorhandler';

const charPosClass = new CharPos();
alt.setInterval(() =>{
    let all = alt.Player.all;
    all.forEach(player => {
        const playerSyncEnabled = player.getMeta(meta.SYNC_ENABLED);
        const cid = player.getMeta(meta.CID);
        if (!playerSyncEnabled || !cid) return;
        
        let x = player.pos.x;
        let y = player.pos.y;
        let z = player.pos.z;
        let d = player.dimension;
        try {
            charPosClass.update(cid, x, y, z, d);
        } catch (err) {
            console.error(`[CHARSYNC] ${err} [${cid}]`);
            errorhandler(err, 1700427792630);
        }
        
    });
},1000 * 2);