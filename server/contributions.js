const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
var formidable = require( 'formidable' );
var path = require( 'path' );
var jimp = require( 'jimp' );


const pool  = mysql.createPool( {

	host: 'localhost',
	user: 'root',	
	password: 'c0a37ward3!',
	database : 'coastwards'

} );

var form = new formidable.IncomingForm();
form.uploadDir = path.join( __dirname, '../public/uploads' );
form.keepExtensions = true;
form.type = 'multipart';

var _promiseFormidable = ( req ) => {

	return new Promise( ( resolve, reject ) => {

		form.parse( req, function ( err ) {

			if( err ){

				reject( Error( 'contribution/_formidable/parse(error)/' + err ) );

			}

		} );

		form.on( 'error', function ( err ){

			reject( Error( 'contribution/_formidable/on(error)/' + err ) );

		} );

		form.on( 'aborted', function ( err ){

			reject( Error( 'contribution/_formidable/on(aborted)/' + err ) );

		} );

		form.on( 'end', function ( err ){

			resolve( this.openedFiles );

		} );

	} );

}


router.post( '/upload', function ( req, res ) {

	_promiseFormidable( req )
	.then( ( openedFiles ) => {

		var flag = jimp.read( openedFiles[ 0 ] )
		.then( function ( file ) {

			var flag = file.resize( 500, 500 );

			console.log( 'return value of resize: ', flag );

			return file.resize( 500, 500 );

		} )
		.catch( ( err ) => { 

			throw err;

		} );

		console.log( 'return value of jimp: ', flag );

		return openedFiles;

	} )
	.catch( ( err ) => {

		console.log( err );

	} );


	/*var contribution = req.body.dropzone[ 0 ];
	var ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;
	var coords = contribution.imageHasLocation.result.specs;

	//INSERT INTO `coastwards_schema`.`contributions` (`contribution_filename`, `contribution_ip`, `contribution_long`, `contribution_lat`, `contribution_location_manual`) VALUES ('03.jpg', 'office', 'asdf', 'sadf', '0');
	var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??) VALUES ( ?, ?, ?, ?, ?)';
	var inserts = [ 
		'coastwards', 
		'contributions', 
		'contribution_filename', 
		'contribution_ip', 
		'contribution_long', 
		'contribution_lat', 
		'contribution_location_manual',
		contribution.name,
		ip,
		coords.long,
		coords.lat,
		0

	]

	var query = mysql.format( sql, inserts );

	pool.getConnection( function ( err, connection ) {

		// Use the connection 
		connection.query( query, function ( err, rows ) {

			if( err ){

				res.send( err );

			}else{

				console.log( rows )
				res.json( rows );

			}

			connection.release();

		} );

	} );*/


} );


router.get( '/geojson', function ( req, res ) {

	/*pool.getConnection( function ( err, connection ) {

		connection.query( 'SELECT * FROM contributions_schema', function ( err, rows ) {

			res.json( rows );
			connection.release();

		} );

	} );*/

} );

module.exports = router;