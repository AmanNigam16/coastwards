import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import IMG from 'components/tags/img'

import CLOSE from 'components/ui/close'

import style from './_prompts'


const messages = defineMessages( {

	select_file:{
		id: "select_file",
		description: "Prompt - Prompts user to select a file through the file system",
		defaultMessage: "Have any pictures of coasts? Why not upload them now?"
	},
	select_file_parenthesis:{
		id: "select_file_parenthesis",
		description: "Prompt tagline - ",
		defaultMessage: "( Drag & drop your image onto the world map or click the big blue button )"
	},
	drag_and_drop:{
		id: "drag_and_drop",
		description: "Prompt - Prompts user to drag and drop images onto the world map (or click the big red button)",
		defaultMessage: "Drag & drop your image onto the world map to upload (or click the big red button)"
	},
	click_button:{
		id: "click_button",
		description: "Prompt - Prompts user to upload images by clicking on the big red button",
		defaultMessage: "Click the big red button to upload an image"
	},
	upload_ok:{
		id: "upload_ok",
		description: "Status - Informs user that his image was uploaded successfully",
		defaultMessage: "WOHOO! Nice one! Your image was uploaded. Next one! :)"
	}

} )

const prompts = ( { intl, className, prompt, jazzSupported, show, hide } ) => {

	const { formatMessage } = intl

	const str = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt

	const logo = jazzSupported && prompt == 'select_file'

	const cls = Classnames( className, style.prompts, {

		[ style.show ]: show

	} )

	return(

		<DIV id="Prompts" className={ cls } onClick={ hide } >
			{ logo && <IMG src="assets/coastwards-alpha.png" className={ style.logo } alt="Coastwards Logo: A turtle on a mission" /> }
			<H priority={ 2 }>{ str } 
				{ jazzSupported && <CLOSE onClick={ hide } /> }
			</H>
		</DIV>

	)
	
}

prompts.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	
	prompt: PropTypes.string,
	jazzSupported: PropTypes.bool,
	show: PropTypes.bool,

	hide: PropTypes.func

}

export default injectIntl( prompts )