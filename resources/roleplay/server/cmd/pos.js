import * as chat from 'alt:chat';

chat.registerCmd('pos', (player) =>{
    chat.send(player, 
        `Deine Position: x: ${String(player.pos.x)} y: ${String(player.pos.y)} Z: ${String(player.pos.z)}`
    );
    chat.send(player, 
        `Deine Rotation x: ${String(player.rot.x)} y: ${String(player.rot.y)} Z: ${String(player.rot.z)}`
    );
});
