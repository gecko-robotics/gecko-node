#!/usr/bin/env node

var msgpack = require('msgpack5')();
var decode = msgpack.decode;
var zmq = require('zeromq');
var sock = zmq.socket('sub');
const url = new URL('tcp://127.0.0.1:3000');

sock.connect(url.toString());
sock.subscribe('');
console.log('Subscriber connected to port 3000');

sock.on('message', function(message) {
    const msg = decode(message);
    console.log('recv[', message.length, "]:", msg);
});
