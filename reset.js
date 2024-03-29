const mysql = require( 'mysql' );
const fs = require( 'fs' );
const path = require( 'path' );

const globalConfigs = require ( './config/' );
const { UPLOADS } = require( './config/paths' );
const config = globalConfigs.mysql;

var connection = mysql.createPool( {

	host: config.host,
	user: config.user,	
	password: config.password,
	database : config.database,
	multipleStatements: true

} );

var deleteFolderRecursive = function ( path ) {

	if( fs.existsSync( path ) ) {

		fs.readdirSync( path ).forEach( function ( file ){

			var curPath = path + "/" + file;
			if( fs.lstatSync( curPath ).isDirectory() ) { // recurse

				deleteFolderRecursive( curPath );

			} else { // delete file

				fs.unlinkSync( curPath );

			}

		} );

		fs.rmdirSync( path );

	}

};


function _promiseTruncate (){

	return new Promise( ( resolve, reject ) => {

		connection.query( 'TRUNCATE TABLE contributions', function ( err, rows ) {

			if ( err ) {

				reject( 'Error connecting to database: ' + err.stack );

			}else{

				connection.end();	
				resolve( 'Truncated database' );

			}

		} );


	} );

}

function _promiseRemoveUploads (){

	var uploadDir = UPLOADS;

	return new Promise( ( resolve, reject ) => {

		fs.access( uploadDir, fs.F_OK, function ( err ) {

			if ( err ) {
				
				resolve( "Did not remove upload directory because it doesn't exist" );

			} else {

				deleteFolderRecursive( uploadDir );
				resolve( 'Removed upload directory' );

			}

		} );

	} );

}

function _promiseRemoveBuild (){

	var buildDir = path.join( __dirname, '/public/build' );

	return new Promise( ( resolve, reject ) => {

		fs.access( buildDir, fs.F_OK, function ( err ) {

			if ( err ) {
				
				resolve( "Did not remove build directory because it doesn't exist" );

			} else {

				deleteFolderRecursive( buildDir );
				resolve( 'Removed build directory' );

			}

		} );

	} );

}

return Promise.all( [ _promiseTruncate(), _promiseRemoveUploads(), _promiseRemoveBuild() ] ).then( ( values ) => {

	console.log( values[ 0 ] );
	console.log( values[ 1 ] );
	console.log( values[ 2 ] );
	return values;

} ).catch( ( error ) => {

	console.log( error );

} );