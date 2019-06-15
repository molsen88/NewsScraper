var express = require( 'express' )
var cheerio = require( "cheerio" )
var express = require( "express" )
var logger = require( "morgan" )

var axios = require( "axios" )
var mongoose = require( "mongoose" )

var db = require( "./models" )

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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewsScraper";

mongoose.connect( MONGODB_URI );
// app.get("/")

// var mongojs = require( "mongojs" )

// var databaseUrl = "articles";
// var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
// var db = mongojs( databaseUrl, collections );
// db.on( "error", function ( error ) {
//     console.log( "Database Error:", error );
// } );


app.get( "/articles", function ( req, res ) {
    axios.get( "https://www.liverpoolecho.co.uk/all-about/liverpool-fc" ).then( function ( response ) {
        var $ = cheerio.load( response.data );

        var results = [];

        $( ".teaser" ).each( function ( i, element ) {

            var title = $( element ).children( "a.headline" ).text();

            var summary = $( element ).children( "a.description" ).text()

            var link = $( element ).find( "a.headline" ).attr( "href" );

            results.push( {
                title: title,
                summary: summary,
                link: link

            } )
            return;

        } )
        res.send( results )


        db.Article.create( results ).then( function ( dbArticle ) {
            console.log( dbArticle )
        } ).catch( function ( err ) {
            console.log( err )
        } );
    } );


} )





app.listen( PORT, function () {
    console.log( "App running on port " + PORT + "!" );
} )
