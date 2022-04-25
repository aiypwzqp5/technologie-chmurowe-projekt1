import express from "express";
import ip from "ip";
import getIp from "./getIp.js";
import geoip from 'fast-geoip';
import clm from 'country-locale-map';

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
app.set("trust proxy", true);
app.get("/", (req, res) => {
        let ipAddress, timezone, country_code;
        getIp(req.ip)
            .then(res => {
                ipAddress = res;
                geoip.lookup(res)
                    .then(res => {
                        timezone = res.timezone;
                        country_code = res.country;
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => {
                console.error(err);
            })

		const locale = clm.getCountryByAlpha2(country_code);
        res.type('text/plain');
        res.send(`
            Ip address: ${ipAddress}
            Strefa czasowa: ${timezone}
            Data i godzina: ${new Date().toLocaleString(locale, { timeZone: timezone })}
        `)
	}
);
app.get('/',(req, res) => {
    res.type('text/plain')
    res.send(`Ip address: ${ipAddress}, Strefa czasowa po ip: ${getTimezone(date_ob)}`)
})
app.use((req, res) => {
    res.type('text/plain')
    res.status( 404 )
    res.send('404 Page not found')
})
app.listen(port, () => {
    console.log(`Data uruchomienia: ${year}-${month}-${date} ${hours}:${minutes}:${seconds}`) 
    console.log('Autor: Albert Strzyżewski')
    console.log(`Port: ${port}`);
})