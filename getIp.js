import publicIp from 'public-ip'
import ipaddrJs from 'ipaddr.js'

const getIp = async (address) => {
    const ip = (((ip) => (ip.isIPv4MappedAddress() ? (p.toIPv4Address()) : (ip)))(ipaddrJs.parse(address)));
    return (
        ["unspecified","broadcast","linkLocal","loopback","private","reserved"].includes(ip.range()) 
        ?
        (await Promise.any([publicIp.v4(), publicIp.v6()])) : (ip.toString())
    );
};


export default getIp 