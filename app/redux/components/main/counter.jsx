import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import P from 'components/tags/p'

import style from './_counter'

/*const messages = defineMessages( {

	

} )*/


class counter extends Component {

	static propTypes = {

		//intl: intlShape.isRequired,
		count: PropTypes.number,
		show: PropTypes.bool,

		getCount: PropTypes.func

	}

	componentDidMount (){

		this.props.getCount()

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

	}

	render () {

		//const { formatMessage } = this.props.intl
		const { count, show } = this.props

		if( !count || !show ){

			return null

		}else{

			return (
				
				<DIV id="Counter" className={ style.counter } >
					<P>{ count }</P>
				</DIV>

			)

		}

	}

}

export default counter
