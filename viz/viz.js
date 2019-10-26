#!/usr/bin/env node

"use strict";

const byte1 = 0;
const byte2 = 8;
const byte3 = 16;
const byte4 = 24;

const GVECTOR    = 0;  // vector: x,y,z
const GQUATERNION= 1;  // quaterion: w,x,y,z
const GWRENCH    = 2;  // wrench: force, torque
const GPOSE      = 3;  // pose: position, orientation
const GJOYSTICK  = 4;  // joystick: axes, buttons
const GTWIST     = 5;  // twist: linear, angular velocity
const GCAMERA    = 6;  // camera info: various calibration matricies
const GIMU       = 10; // imu
const GLIDAR     = 20; // lidar
const GIMAGE     = 12; // image
const GOCC       = 13; // occupancy grid
const GODOM      = 14; // odometry

var msgpack = require('msgpack5')();
var encode  = msgpack.encode;
var decode  = msgpack.decode;
// var Buffer = require('safe-buffer').Buffer


class vec_t {
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static encode(obj){
        var buf = new Buffer.alloc(8*3);
        buf.writeDoubleBE(obj.x,0);
        buf.writeDoubleBE(obj.y,8);
        buf.writeDoubleBE(obj.z,16);
        // var buf = new Buffer(obj);
        console.log("ve: " + buf.length)
        return buf;
    }

    static decode(data) {
        console.log("vd: " + data.length)
        var result = new vec_t(
            data.readDoubleBE(byte1),
            data.readDoubleBE(byte2),
            data.readDoubleBE(byte3)
        );

      return result;
    }
};

msgpack.register(GVECTOR, vec_t, vec_t.encode, vec_t.decode);

var a = new vec_t(-1,2.3456789,123.987654321);
var aa = decode(encode(a));
console.log(encode(a).length);
console.log(decode(encode(a)) instanceof vec_t);
console.log(aa);

class quaternion_t {
    constructor(w,x,y,z){
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static encode(obj){
        var buf = new Buffer.alloc(8*4);
        buf.writeDoubleBE(obj.w,0);
        buf.writeDoubleBE(obj.x,8);
        buf.writeDoubleBE(obj.y,16);
        buf.writeDoubleBE(obj.z,24);
        // var buf = new Buffer(obj);
        console.log("ve: " + buf.length)
        return buf;
    }

    static decode(data) {
        console.log("vd: " + data.length)
        var result = new quaternion_t(
            data.readDoubleBE(byte1),
            data.readDoubleBE(byte2),
            data.readDoubleBE(byte3),
            data.readDoubleBE(byte4)
        );

      return result;
    }
};


msgpack.register(GQUATERNION, quaternion_t, quaternion_t.encode, quaternion_t.decode);

var q = new quaternion_t(0.00123456789,-1,2.3456789,123.987654321);
var qq = decode(encode(q));
console.log(q);
console.log(qq);

var w = new quaternion_t(0,1,2,3);
console.log(w);
console.log(encode(w));
