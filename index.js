
var express = require('express');
var app = express();
const moment = require('moment');
console.log('Naci ' + moment('02/09/1980','dd/mm/yyyy').fromNow())

/*
var express = require('express');
var app = express();
const moment = require('moment');
console.log('Naci ' + moment('02/09/1980','dd/mm/yyyy').fromNow())

var hoy = new Date();
console.log('Hoy es ' + hoy);

var i;
for (i=0;i<10;i++){
    console.log(i);
}

*/