import React, { PropTypes, Component } from 'react'
import Classnames from 'classnames'
import Modernizr from 'modernizr'
import LABEL from 'components/tags/label'
import SPAN from 'components/tags/span'

import style from './_hoc'

const hoc = ( ComposedComponent ) => class extends Component {

	static displayName = 'formelementHOC'

	static propTypes = {

		form: PropTypes.string.isRequired,
		label: PropTypes.string,
		name: PropTypes.string.isRequired,
		className: PropTypes.string,
		preferPlaceholder: PropTypes.bool,
		children: PropTypes.node

	}

	static defaultProps = {

		preferPlaceholder: true

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { form, label, name, className, preferPlaceholder, children } = this.props

		const cls = Classnames( className, style.label )

		const showLabel = !Modernizr.placeholder ? true : preferPlaceholder ? false : true

		return(

			<LABEL htmlFor={ name } form={ form } className={ cls } >
				{ showLabel && <SPAN>{ label }</SPAN> }
				{ children }
				<ComposedComponent hocProps={ this.props } />
			</LABEL>

		)

	}

}

export default hoc
