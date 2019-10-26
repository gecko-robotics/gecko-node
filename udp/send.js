#!/usr/bin/env node

// Require node js dgram module.
var dgram = require('dgram');

// Create a udp socket client object.
var client = dgram.createSocket("udp4");

// message variable is used to save user input text.
// var message = "";

// Set command line input character encoding to utf-8.
process.stdin.setEncoding('utf-8');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
// function sleep(millis) {
//     return new Promise(resolve => setTimeout(resolve, millis));
// }

async function run(){
    while(1){
        // setTimeout(function() {}, 1000);
        await sleep(1000);
        // sleep(1000);

        var msg = "message";
        var message = Buffer.from(msg);
        client.send(message, 0, message.length, 8089, "localhost");
        console.log(msg);

        // const t = new Date().now();
        // console.log(t.toString());
        // console.log(Date.time());
    }
}

run();

// // When receive user input data in console.
// process.stdin.on('data', function (text) {
//
//     // If user input 'send\n' then send all user input data to udp server.
//     if('send\n' === text) {
//
//         // If user do not input data in command line then send default message.
//         if (message == null || message.length == 0) {
//             message = "Hello udp server.";
//
//         }
//
//         console.log("User input : " + message);
//
//         // Create a node Buffer object to wrap message object.
//         message = new Buffer(message);
//
//         // Send message to udp server through client socket.
//         client.send(message, 0, message.length, 8089, "localhost");
//
//     }else{
//         // Concat all user input text in message.
//         message += text;
//     }
// });
