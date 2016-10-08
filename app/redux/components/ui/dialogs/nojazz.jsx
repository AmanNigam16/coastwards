import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	nojazz_header:{
		id: "nojazz_header",
		description: "Header - Browser support",
		defaultMessage: "Browser Support"
	},
	nojazz_text:{
		id: "nojazz_text",
		description: "P - ",
		defaultMessage: "Hmm, looks like you are using an old browser (or a not so old Internet Explorer). This site will work on your browser BUT IT'S SOO MUCH MORE FUN if you switch to a modern browser AND you can browse the images of coasts that have been uploaded from other people around the world. Chrome, Firefox or Safari are safe choices, especially if updated to the latest versions."
	}

} )


const nojazz = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<H priority={ 2 }>{ formatMessage( messages.nojazz_header ) }</H>
			<P>{ formatMessage( messages.nojazz_text ) }</P>
		</DIV>

	)

}

nojazz.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( nojazz )