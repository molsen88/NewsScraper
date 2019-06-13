var express = require( 'express' )
var cheerio = require( 'cheerio' )
var express = require( 'express' )

var axios = require( 'axios' )
var mongoose = require( 'mongoose' )

var db = require( './models' )

var PORT = 3000;

var app = express();
















app.listen( PORT, function () {
    console.log( "App running on port " + PORT + "!" );
} );