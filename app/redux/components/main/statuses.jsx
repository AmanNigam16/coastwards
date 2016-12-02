import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'

import style from './_statuses'

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
	}

} )

const statuses = ( { intl, className, status, progress, show } ) => {

	const { formatMessage } = intl

	const stat = messages[ status ] ? formatMessage( messages[ status ], { progress: progress } ) : status

	const cls = Classnames( className, style.statuses, {

		[ style.show ]: show

	} )

	return(

		<DIV id="Statuses" className={ cls } >
			<H priority={ 2 }>{ stat }</H>
			<DIV className={ style.loader }></DIV>
		</DIV>

	)
	
}

statuses.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,

	status: PropTypes.string,
	progress: PropTypes.number,
	show: PropTypes.bool,

	resetForm: PropTypes.func

}

export default injectIntl( statuses )