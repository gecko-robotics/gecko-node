#!/usr/bin/env node

var assert = require('assert');
var msgpack = require('msgpack');

var o = {"a" : 1, "b" : 2, "c" : [1, 2, 3]};
var b = msgpack.pack(o);
var oo = msgpack.unpack(b);

console.log(o);
console.log(oo);

class MyType {
    constructor(a, b, c){
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

const a = new MyType(1.2,3.4,-345.123456789);

console.log(a);
console.log(JSON.stringify(a));
console.log(JSON.stringify(a).length);
console.log(msgpack.pack(a).length);
console.log(msgpack.unpack(msgpack.pack(a)));
console.log(msgpack.unpack(msgpack.pack(a)) instanceof MyType);
