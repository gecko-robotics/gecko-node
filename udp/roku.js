#!/usr/bin/env node

var dgram = require('dgram');
var server = dgram.createSocket({type: 'udp4', reuseAddr: true});
// server.bind();
const PORT = 1900;
const MCAST_ADDR = "239.255.255.250";

server.bind(PORT, function(){
    server.setBroadcast(true);
    server.setMulticastTTL(2);
    server.addMembership(MCAST_ADDR);
});

server.on('message', function (message, remote) {
    console.log('MCast Msg: From: ' + remote.address + ':' + remote.port +' - ' + message);
});

const s = 'M-SEARCH * HTTP/1.1\nHOST: '+MCAST_ADDR+':'+PORT+'\nMAN: "ssdp:discover"\nST: roku:ecp\nMX: 3\n\n'

function ping(){
    const message = new Buffer.from(s);
    console.log("ping ============== \n");
    // console.log(s);
    server.send(message, 0, message.length, PORT, MCAST_ADDR);
}

setInterval(ping, 3000);
