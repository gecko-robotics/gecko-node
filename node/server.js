#!/usr/bin/env node
var msgpack = require('msgpack5')();
var encode = msgpack.encode;
// var decode = msgpack.decode;

// const msg = {"a":[0.001,-2,3.1234]};
// const a = encode(msg);
//
// console.log(msg);
// console.log(a);
// console.log(a.length);
// console.log(decode(a));

// pubber.js
var zmq = require('zeromq')
var sock = zmq.socket('pub');
const url = new URL('tcp://127.0.0.1:3000');

sock.bindSync(url.toString());
console.log('Publisher bound to port 3000');

setInterval(function(){
    // console.log('sending a multipart message envelope');
    const a = {"a":[0.001,-2,3.1234],"timestamp": Date.now()};
    const msg = encode(a);
    console.log("sending[",msg.length,"]:",a);
    sock.send(msg);
}, 500);
