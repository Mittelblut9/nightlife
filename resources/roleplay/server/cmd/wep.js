import * as chat from 'alt:chat';
import * as alt from 'alt-server';
chat.registerCmd('wep', (player, arg) =>{
    player.giveWeapon(alt.hash(arg), 9999, true);
});