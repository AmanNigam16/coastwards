import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'

//import style from './_statuses'

const messages = defineMessages( {

	status_validating:{
		id: "status_validating",
		description: "Status - Informs user that selected image(s) is being validated",
		defaultMessage:"Validating your image .. (just a few seconds)"
	},
	status_uploading:{
		id: "status_uploading",
		description: "Status - Informs user that his image is being uploaded",
		defaultMessage: "Uploading... {progress}%"
	},
	status_upload_ok:{
		id: "status_upload_ok",
		description: "Status - Informs user that his image was uploaded successfully",
		defaultMessage: "WOHOO! Nice one! Your image was uploaded. Next one! :)"
	},

} )

const statuses = ( { intl, className, show, status, progress } ) => {

	const { formatMessage } = intl

	const stat = messages[ status ] ? formatMessage( messages[ status ], { progress: progress } ) : status

	const s = {

		display: show ? 'block' : 'none'

	}

	const cls = Classnames( className )

	return(

		<DIV id="Statuses" style={ s } className={ cls } >
			<H priority={ 2 }>{ stat }</H>
		</DIV>

	)
	
}

statuses.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,

	show: PropTypes.bool,
	status: PropTypes.string,
	progress: PropTypes.number,

	resetForm: PropTypes.func

}

export default injectIntl( statuses )