import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import H from 'components/tags/h'
import IMG from 'components/tags/img'
import FORM from 'components/tags/form'
import SPAN from 'components/tags/span'
import INPUT from 'components/tags/input'
import BUTTON from 'components/tags/button'

import BR from 'components/tags/br'

const messages = defineMessages( {

	hurray:{
		id: "hurray",
		description: "Header - Informs user that his or her image has passed all the tests and is now ready for upload",
		defaultMessage: "AWESOME! Your image passed all the tests and is ready for upload!"
	},
	help_more:{
		id: "help_more",
		description: "Header - Asks user to help even more by answering a few questions",
		defaultMessage: "Two more questions though, if we may:"
	},
	img_alt: {
		id: "img_alt",
		description: "Alt - Alternative description of the uploaded image",
		defaultMessage: "Your image"
	},
	select_material:{
		id: "select_material",
		description: "Header - Asks user to describe the coast material",
		defaultMessage: "How would you describe the coast material?"
	},


	//materials
	sand:{
		id: "sand",
		description: "Material - Sand",
		defaultMessage: "Sand"
	},
	pebble:{
		id: "pebble",
		description: "Material - Pebble",
		defaultMessage: "Pebble"
	},
	rock:{
		id: "rock",
		description: "Material - Rock",
		defaultMessage: "Rock"
	},
	mud:{
		id: "mud",
		description: "Material - Mud",
		defaultMessage: "Mud"
	},
	manmade:{
		id: "manmade",
		description: "Material - Man-made",
		defaultMessage: "Man-made"
	},
	ice:{
		id: "ice",
		description: "Material - Ice",
		defaultMessage: "Ice"
	},
	notsure:{
		id: "notsure",
		description: "Material - Not sure",
		defaultMessage: "Not sure"
	},

	upload_image:{
		id: "upload_image",
		description: "Button label - Prompts the user to upload the image",
		defaultMessage: "UPLOAD"
	},
	cancel_upload:{
		id: "cancel_upload",
		description: "Button label - Cancel upload",
		defaultMessage: "Cancel upload"
	}

} )

const form = ( { intl, show, image, setMaterial, uploadImage, resetMain } ) => {

	const { formatMessage } = intl

	const style = {

		display: show ? 'block' : 'none'

	}

	return(

		<FORM id="Form" style={ style } action="#" >
			{ image.dataURL && <IMG src={ image.dataURL } alt="your image" /> }
			<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
			<H priority={ 3 }>{ formatMessage( messages.help_more ) }</H>
			<H priority={ 4 }>{ formatMessage( messages.select_material ) }</H>
			<SPAN><INPUT form="Form" type="radio" name="material" value="sand" onClick={ setMaterial } />{ formatMessage( messages.sand ) }</SPAN>
			<SPAN><INPUT form="Form" type="radio" name="material" value="pebbles" onClick={ setMaterial } />{ formatMessage( messages.pebble ) }</SPAN>
			<SPAN><INPUT form="Form" type="radio" name="material" value="rock" onClick={ setMaterial } />{ formatMessage( messages.rock ) }</SPAN>
			<SPAN><INPUT form="Form" type="radio" name="material" value="mud" onClick={ setMaterial } />{ formatMessage( messages.mud ) }</SPAN>
			<SPAN><INPUT form="Form" type="radio" name="material" value="ice" onClick={ setMaterial } />{ formatMessage( messages.ice ) }</SPAN>
			<SPAN><INPUT form="Form" type="radio" name="material" value="manmade" onClick={ setMaterial } />{ formatMessage( messages.manmade ) }</SPAN>
			<SPAN><INPUT form="Form" type="radio" name="material" value="notsure" onClick={ setMaterial } />{ formatMessage( messages.notsure ) }</SPAN>
			<BR />
			<BUTTON type="button" onClick={ uploadImage }>{ formatMessage( messages.upload_image ) }</BUTTON>
			<BUTTON type="button" onClick={ resetMain }>{ formatMessage( messages.cancel_upload ) }</BUTTON>
		</FORM>

	)
	
}

form.propTypes = {

	intl: intlShape.isRequired,

	show: PropTypes.bool,
	image: PropTypes.object,

	setMaterial: PropTypes.func,
	uploadImage: PropTypes.func,
	resetMain: PropTypes.func

}

export default injectIntl( form )
