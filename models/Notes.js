var mongoose = require( "mongoose" )

var Schema = mongoose.Schema;

var NotesSchema = new Schema( {

    title: String,

    body: String
} )

var Notes = ( "Notes", NotesSchema );

module.export = Notes;