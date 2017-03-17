import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import IMG from 'components/tags/img'

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
	},
	loader:{
		id: "loader",
		description: "Alt - Describe image",
		defaultMessage: "Progress spinner"
	}

} )

const statuses = ( { intl, className, jazzSupported, show, status, progress } ) => {

	const { formatMessage } = intl

	const stat = messages[ status ] ? formatMessage( messages[ status ], { progress: progress } ) : status
	

	if( !jazzSupported ){

		const clsNoJazz = Classnames( style.noJazz, {

			[ style.show ]: show

		} )

		return(

			<DIV id="Statuses" className={ clsNoJazz } >
				<H priority={ 2 }>{ stat }</H>
				<IMG src="assets/loader.gif" alt={ formatMessage( messages.loader ) } />
			</DIV>

		)

	}else{

		<DIV>status</DIV>

	}

	/*const cls = Classnames( className, style.statuses, {

		[ style.show ]: show

	} )

	return(

		<DIV id="Statuses" className={ cls } >
			<H priority={ 2 }>{ stat }</H>
			{ jazzSupported && <DIV className={ style.spinner }></DIV> }
			{ !jazzSupported && <IMG src="assets/loader.gif" alt={ formatMessage( messages.loader ) } /> }
		</DIV>

	)*/
	
}

statuses.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	jazzSupported: PropTypes.bool,
	show: PropTypes.bool,
	status: PropTypes.string,
	progress: PropTypes.number,

	resetForm: PropTypes.func

}

export default injectIntl( statuses )