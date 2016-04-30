import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Classnames from 'classnames';

import { Toggle, ToggleLink, ToToggle } from '../../utils/Toggle/Toggle';
import Transcript from './Transcript';

import style from './_styleHow';

const messages = defineMessages( {

	how_headline:{
		id: "how_headline",
		description: "0 - ",
		defaultMessage: "How Does A Picture Help?"
	},
	show_transcript:{
		id: "show_transcript",
		description: "1 - ",
		defaultMessage: "Show transcript"
	}

} );

class How extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		const cls = Classnames( style.corset, style.how );
		const clsWrapper = Classnames( style.videoWrapper, style.video );

		return (

			<div id="How" className={ cls }>
				<div id="Video" className={ clsWrapper }>
					<iframe></iframe>
				</div>
				<Toggle>
					<ToggleLink>{ formatMessage( messages.show_transcript ) }</ToggleLink>
					<ToToggle>
						<Transcript id="Transcript" />
					</ToToggle>
				</Toggle>
			</div>

		)

	}

}

How.propTypes = {

	intl: intlShape.isRequired

};

How.defaultProps = {

	

};

How.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( How );
