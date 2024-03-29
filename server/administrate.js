const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
const _ = require( 'underscore' )
const fs = require( 'fs' )
const path = require( 'path' )
const parse = require( 'csv-parse' )
const util = require( 'util' )
const http = require( 'http' )
const { PICTURE_UPLOADS_PATH, TEMP_UPLOADS_PATH } = require( '../config/paths' )

const pool  = require( './mysql' ).pool

const _promiseFetchForm = ( req ) => {

	var form = new formidable.IncomingForm()
	
	if ( !fs.existsSync( TEMP_UPLOADS_PATH ) ){

		fs.mkdirSync( TEMP_UPLOADS_PATH )

	}

	form.uploadDir = TEMP_UPLOADS_PATH;
	form.keepExtensions = true;

	return new Promise( ( resolve, reject ) => {

		var formData = {}

		form.parse( req, function ( error, fields, files ) {

			if( error ){

				reject( Error( 'contact/_promiseFetchForm/parse(error)/' + error ) )

			}else if ( _.isEmpty( fields ) ){

				reject( Error( 'Form is empty' ) )

			}else{

				// http://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
				//var ip = req.ip

				// https://github.com/indutny/node-ip
				var ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress

				//var ip = "192.168.100.87, 195.90.21.11"
				//http://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
				var ip_array = ip.split( ',' )

				formData.ip = ip_array[ 0 ]

				formData.fields = fields
				formData.files = files

			}

		} )

		form.on( 'error', function ( error ){

			reject( Error( 'contact/_promiseFetchForm/on(error)/' + error ) )

		} )

		form.on( 'aborted', function ( error ){

			reject( Error( 'contact/_promiseFetchForm/on(aborted)/' + error ) )

		} )

		form.on( 'fileBegin', function ( name, file ){

			var dirname = path.dirname( file.path )			
			file.path = path.join( dirname, file.name ) 

		} )

		form.on( 'end', function ( ){

			resolve( formData )

		} )
	
	} )

}

const _createConnection = () => {

	return new Promise( ( resolve, reject ) => {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				resolve( connection )

			}

		} )

	} )

}

const _queryConnection = ( connection, query ) => {

	return new Promise( ( resolve, reject ) => {

		connection.query( query, function ( error, rows ) {

			if( error ){

				reject( error )

			}else{

				resolve( rows )

			}

			connection.release()

		} )

	} )

}

const _fetch = ( formData ) => {

	return new Promise( ( resolve, reject ) => { 

		const { material, materialverified, verified, id, example, intro, closeup, pointmanual, pointcorrected, source, reported } = formData.fields

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "materialverified": "\',IFNULL(contribution_material_verified, "notset" ),\'" } } \'), \'] }\' ) as geojson FROM contributions WHERE contribution_material LIKE ? && contribution_material_verified LIKE ? && contribution_verified LIKE ? && contribution_id LIKE ? && contribution_example LIKE ? && contribution_intro LIKE ? && contribution_closeup LIKE ? && contribution_point_manual LIKE ? && contribution_point_corrected LIKE ? && contribution_source LIKE ? && contribution_reported LIKE ?';

				var inserts = [

					material,
					materialverified,
					verified,
					id,
					example,
					intro,
					closeup,
					pointmanual,
					pointcorrected,
					source,
					reported

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( error, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 1 ][ 0 ].geojson === undefined ){

							reject( Error( 'administrate/_fetch/Could not read result from query (Update schema?)' ) )

						}else{

							resolve( results[ 1 ][ 0 ].geojson )

						}

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.post( '/fetch', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _fetch )
		.then( JSON.parse )
		.then( ( geojson ) => {

			res.json( { status: 'OK', json: geojson } )
			return geojson;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )


const _delete = ( formData ) => {

	return new Promise( ( resolve, reject ) => { 

		const { id, uid } = formData.fields

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'DELETE FROM contributions WHERE contribution_id=?';

				var inserts = [

					id

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( error ) {

					if( error ){

						reject( error )

					}else{

						resolve( uid )

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

const _unlink = ( uid ) => {

	return new Promise( ( resolve, reject ) => { 

		fs.unlink( path.join( PICTURE_UPLOADS_PATH, uid + '.jpg' ), ( error ) => {

			if( error ){

				reject( error )

			}else{

				resolve( uid )

			}

		} )

	} ) 

}

router.post( '/delete', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _delete )
		.then( _unlink )
		.then( ( uid ) => {

			res.json( { status: 'OK', uid: uid } )
			
			return uid

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

const _update = ( formData ) => {

	return new Promise( ( resolve, reject ) => { 

		const { id, verified, material, example, intro, closeup, reported, long, lat, corrected } = formData.fields
		const point = util.format( 'POINT(%s %s)', long, lat )

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'UPDATE ?? SET contribution_verified=?, contribution_material_verified=?, contribution_example=?, contribution_intro=?, contribution_closeup=?, contribution_reported=?, contribution_point=(ST_PointFromText(?)), contribution_point_corrected=? WHERE contribution_id=?';

				var inserts = [

					"contributions",

					verified,
					material,
					example,
					intro,
					closeup,
					reported,
					point,
					corrected,

					id

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( error, result ) {

					if( error ){

						reject( error )

					}else{

						resolve( result.affectedRows )

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.post( '/update', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _update )
		.then( ( affectedRows ) => {

			res.json( { status: 'OK', affectedRows: affectedRows } )
			
			return affectedRows

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )


function _promiseFetchExamples (){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT GROUP_CONCAT(contribution_uid) as uids, ?? as type FROM ?? WHERE ??=? GROUP BY ??'
				//var sql = 'SELECT CONCAT( \' { "type": \', contribution_material_verified, \', “images”: [\', GROUP_CONCAT(contribution_uid), \'] } \' ) as json FROM ?? WHERE ??=? GROUP BY ??'
				var inserts = [

					"contribution_material_verified",

					"contributions",

					"contribution_example",
					"1",

					"contribution_material_verified"

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( error, results ) {

					if( error ){

						reject( error )

					}else{

						if( results === undefined ){

							reject( Error( 'contributions/promiseFetchExamples/Could not read result from query (Update schema?)' ) )

						}else{

							resolve( results )

						}

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.get( '/examples', function ( req, res ) {

	_promiseFetchExamples()
		.then( ( json ) => {

			res.json( { status: 'OK', json: json } )
			return json;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

function _promiseParseRivagesCSV ( formData ){

	return new Promise( ( resolve, reject ) => {

		const from = formData.fields.from
		fs.readFile( formData.files.csv.path, ( error, data ) => {

			if( error ){

				reject( error )

			}else{

				parse( data.toString(), { columns: true, from: from }, ( error, output ) => {

					if( error ){

						reject( error )

					}else{

						formData.output = output
						resolve( formData )

					}

				} )

			}

		} )

	} )

}

function _promiseFetchRivagesImage ( filename ){

	const url = "http://geolittoral.application.developpement-durable.gouv.fr/telechargement/tc_smartphone/photos/" + filename + ".jpg"

	const localFile = PICTURE_UPLOADS_PATH + filename + ".jpg"
	const writable = fs.createWriteStream( localFile )

	return new Promise( ( resolve, reject ) => {

		http.get( url, ( res ) => {

			res.pipe( writable )

			res.on( 'error', ( error ) => {

				reject( error )

			} )

			res.on( 'end', () => {

				resolve( filename ) 

			} )

		} ).on( 'error', ( error ) => {

			reject( error )

		} )

	} )

}

function _promiseInsertRivagesRow ( row ) {

	return new Promise( ( resolve, reject ) => {

		const { Longitude, Latitude, Filename } = row
		const ip = '194.5.172.160' //geolittoral.application.developpement-durable.gouv.fr
		const exif_datetime = row[ 'Date and t' ]
		const filename = path.parse( Filename ).name
		const point = util.format( 'POINT(%s %s)', Longitude, Latitude )

		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?,(INET6_ATON(?)), ?, ?, ? )'

		var inserts = [ 
			'coastwards', 
			'contributions',


			'contribution_point',
			'contribution_point_manual',
			'contribution_point_corrected',
			'contribution_uid',
			"contribution_comment",
			//'contribution_labels',
			//'contribution_exif',
			'contribution_ip',
			'contribution_exif_datetime',
			'contribution_closeup',
			'contribution_source',


			point,
			'0',
			'0',
			filename,
			'',
			//'labels',
			//'exifdata',
			ip,
			//CAREFULL!!!!
			exif_datetime,
			'1',
			'rivages'

		]

		var query = mysql.format( sql, inserts )

		_createConnection()
			.then( ( connection ) => {

				return _queryConnection( connection, query )

			} )
			.then( ( rows ) => {

				resolve( 'imported' )
				return _promiseFetchRivagesImage( filename ) 

			} )
			.catch( ( error ) => {

				if( error.code == 'ER_DUP_ENTRY' ){ //the only error we wave through

					resolve( 'duplicate' )

				}else{

					//console.log( error )
					_unlink( filename )
					reject( error )

				}

			} )

	} )

}

router.post( '/importRivagesCSV', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _promiseParseRivagesCSV )
		.then( ( formData ) => {

			const rows = formData.output
			const resultArray = []

			return _.reduce( rows, ( current, next ) => {

				return current.then( () => {

					return _promiseInsertRivagesRow( next )
						.then( ( result ) => {

							console.log( result )
							resultArray.push( result )
							return resultArray 

						} )
						.catch( ( error ) => {

							console.log( error )
							resultArray.push( error.code )
							return resultArray 

						} )

				} )


			}, Promise.resolve() )
				.then( ( result ) => {

					return result

				} )
				.catch( ( error ) => { 

					throw Error( error )

				} )


		} )
		.then( ( resultArray ) => {

			console.log( resultArray )
			res.json( { status: 'OK', array: resultArray } )
			return resultArray

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )


function _promiseFetchContribution ( id ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT * FROM ?? WHERE ??=?'
				var inserts = [

					"contributions",

					"contribution_id",
					id

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( error, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 0 ] === undefined ){

							reject( Error( 'contributions/promiseFetchContribution/Could not read result from query (Update schema?)' ) )

						}else{

							resolve( results[ 0 ] )

						}

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.get( '/:contribution_id', function ( req, res ) {

	_promiseFetchContribution( req.params.contribution_id )
		.then( ( json ) => {

			res.json( { status: 'OK', json: json } )
			return json;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )


module.exports = router