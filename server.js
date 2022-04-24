const express = require( 'express' )
const ip = require("ip");
const satelize = require('satelize');

const app = express()
const port = 6060

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

let ipAddress = ip.address();

const getTimezone = (time) => {
    const hours = time.getTimezoneOffset() / 60;
    const prefix = hours >= 0 ? '+' : '-';
    const hours_abs = Math.abs(hours);
    
    return `GMT ${prefix} ${String(hours_abs).padStart(2, '0').padEnd(4, '0')}`
};

app.get('/',(req, res) => {
    res.type( 'text/plain' )
    res.send(`Ip address: ${ipAddress}, Strefa czasowa po ip: ${getTimezone(date_ob)}`)
})
app.use((req, res) => {
    res.type( 'text/plain' )
    res.status( 404 )
    res.send('404 Not found ☕_☕')
})
app.listen(port, () => {
    console.log(`Data uruchomienia: ${year}-${month}-${date} ${hours}:${minutes}:${seconds}`) 
    console.log('Autor: Albert Strzyżewski')
    console.log(`Port: ${port}`);
})