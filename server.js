var express = require( 'express' )
var cheerio = require( 'cheerio' )
var express = require( 'express' )
var logger = require( 'morgan' )

var axios = require( 'axios' )
var mongoose = require( 'mongoose' )

var db = require( './models' )

var PORT = 3000;

var app = express();


// Use morgan logger for logging requests
app.use( logger( "dev" ) );
// Parse request body as JSON
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
// Make public a static folder
app.use( express.static( "public" ) );

// Connect to the Mongo DB
// mongoose.connect( "mongodb://localhost:27017/NewsScraper", { useNewUrlParser: true } );

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect( MONGODB_URI );


axios.get( "https://www.liverpoolecho.co.uk/all-about/liverpool-fc" ).then( function ( response ) {
    var $ = cheerio.load( response.data );

    var results = [];

    $( ".teaser" ).each( function ( i, element ) {

        var title = $( element ).text();

        var link = $( element ).children( "a.headline" ).attr( "href" );

        results.push( {
            title: title,
            link: link
        } );
    } );
    console.log( results )
} )

// app.get( "/scrape", function ( req, res ) {
//     axios.get( "https://www.liverpoolecho.co.uk/all-about/liverpool-fc" ).then( function ( response ) {
//         var $ = cheerio.load( response.data )

//         $( ".teaser" ).each( function ( i, element ) {
//             var result = {};

//             result.title = $( this )
//                 .children( "a.headline" )
//                 .text();

//             result.link = $( this )
//                 .chilren( "href" )
//                 .text();

//             db.Article.create( result ).then( function ( dbArticle ) {
//                 console.log( dbArticle )
//             } )
//                 .catch( function ( err ) {
//                     console.log( err )
//                 } );
//         } );
//         res.send( "Scrape Complete" )
//     } );
// } );

// Route for getting all Articles from the db
// app.get( "/articles", function ( req, res ) {
// Grab every document in the Articles collection
// db.Article.find( {} )
// .then( function ( dbArticle ) {
// If we were able to successfully find Articles, send them back to the client
// res.json( dbArticle );
// } )
// .catch( function ( err ) {
// If an error occurred, send it to the client
// res.json( err );
// } );
// } );

// app.post( "/all", function ( req, res ) {

// } )













app.listen( PORT, function () {
    console.log( "App running on port " + PORT + "!" );
} );