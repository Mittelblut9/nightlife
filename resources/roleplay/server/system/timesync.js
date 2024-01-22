import * as alt from 'alt-server';

alt.setInterval(() =>{//Dont ask why they want all of this
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth(); //Starts count at 0
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let all = alt.Player.all;
    all.forEach(player => {
        player.setDateTime(day, month, year, hour, minute, second);
    });
}, 1000 * 1);