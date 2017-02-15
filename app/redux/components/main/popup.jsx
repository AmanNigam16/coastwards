import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape, FormattedDate } from 'react-intl'
import _ from 'underscore'
import validator from 'validator'
/*import Classnames from 'classnames'
import unescape from 'validator/lib/unescape'*/

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'
import P from 'components/tags/p'
import BR from 'components/tags/br'
/*import SPAN from 'components/tags/span'*/

import style from './_popup'

const messages = defineMessages( {

	// materials <--> popup.jsx
	// DO NOT DELETE, DYNAMIC!
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
	notdefined:{
		id: "notdefined",
		description: "Material",
		defaultMessage: "Not set yet"
	},

	close_popup:{
		id: "close_popup",
		description: "Title - ",
		defaultMessage: "Close popup"
	},
	report_image:{
		id: "report_image",
		description: "Title - ",
		defaultMessage: "Report image"
	},

	toggle_comment:{
		id: "toggle_comment",
		description: "Title - ",
		defaultMessage: "Toggle comment"
	}


} )


class popup extends Component {

	static propTypes = {

		intl: intlShape.isRequired,

		feature: PropTypes.object,
		materials: PropTypes.array,

		hidePopup: PropTypes.func,
		showDialog: PropTypes.func

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			commentToggled: false

		}

	}

	render () {

		const { formatMessage } = this.props.intl
		const { feature, materials, hidePopup, showDialog } = this.props
		const { commentToggled } = this.state

		if( !feature.contribution_uid ){

			return (
				
				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.spinner }></DIV>
				</DIV>

			)

		}else{

			const { contribution_material, contribution_comment, contribution_uid, contribution_exif_datetime/*, contribution_hashtag*/ } = feature

			const mat = contribution_material ? contribution_material : ''
			const m = _.findWhere( materials, { value: mat } )
			const color = m.color

			const usercomment = validator.unescape( contribution_comment )
			const hascomment = usercomment != ''
			const showcomment = commentToggled && hascomment
			const commentIcon = showcomment ? 'insert_comment' : 'mode_comment'

			const date = contribution_exif_datetime == '0999-12-31T23:00:00.000Z' ? false : contribution_exif_datetime

			return(

				<DIV id="Popup" className={ style.popup } >
					{ !showcomment && <DIV className={ style.bar }>
						<A onClick={ showDialog.bind( this, 'REPORT' ) } className={ style.report } title={ formatMessage( messages.report_image ) } >
							<I className="material-icons">report_problem</I>
						</A>
						{ date && <FormattedDate
							value={ new Date( contribution_exif_datetime ) }
							year="numeric"
							month="long"
						/> }
					</DIV> }
					<DIV className={ style.top } style={ { backgroundImage: 'url("uploads/' + contribution_uid +'.jpg")' } } >
						{ showcomment && <P className={ style.comment } >{ usercomment }</P> }
					</DIV>
					<DIV className={ style.actions }>
						{ mat != '' && <P className={ style.label } style={ { backgroundColor: color } } >{ formatMessage( messages[ mat ] ) }</P> }
						{ hascomment && <A onClick={ this._toggleComment } className={ style.showcomment } title={ formatMessage( messages.toggle_comment ) } >
							<I className="material-icons">{ commentIcon }</I>
						</A> }
						<A onClick={ hidePopup } className={ style.close } title={ formatMessage( messages.close_popup ) } >
							<I className="material-icons">clear</I>
						</A>
					</DIV>
				</DIV>

			)

		}

	}

	_toggleComment = () => {

		this.setState( { commentToggled: !this.state.commentToggled } )

	}

}

export default injectIntl( popup )
