import { connect } from 'react-redux'

import { validateFile, openInput } from 'actions/main/main'
import { setLayerVisibility } from 'actions/layers'
import UPLOAD from 'components/main/upload'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.upload,
		jazzSupported: state.browser.jazzSupported,
		prompt: state.prompt

	}

}  

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateFile: ( e ) => {

			dispatch( validateFile( e ) )

		},
		setLayerVisibility: ( options ) => {

			dispatch( setLayerVisibility( options ) )

		},
		openInput: ( e ) => {

			e.preventDefault()
			dispatch( openInput( ) )

		}

	}

}


const upload = connect(

	mapStateToProps,
	mapDispatchToProps

)( UPLOAD )

export default upload