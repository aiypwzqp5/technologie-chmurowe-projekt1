import publicIp from 'public-ip'
import ipaddrJs from 'ipaddr.js'

const getIp = async (address) => {
    let ret;
    const ipAddress = ((address => address?.isIPv4MappedAddress?.() ? address.toIPv4Address() : address)(ipaddrJs.parse(address)));
    if(["broadcast","linkLocal","loopback","private","reserved","unspecified"].includes(ipAddress.range())){
        ret = await Promise.any([publicIp.v4(), publicIp.v6()])
    }else{
        ret = ipAddress.toString()
    }
    return ret;
};


export default getIp 