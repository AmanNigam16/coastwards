import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
/*import { scrollToId } from 'actions/context'*/
import Classnames from 'classnames'
import DIV from 'components/tags/div'


//TODO: i18nLinks should handle that itself?
import i18nLocales from 'actions/i18n/i18nLocales'
import I18nLinks from 'components/i18n/i18nLinks'

import Main from 'containers/main/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'


import How from 'components/info/how'
import Guidelines from 'containers/info/guidelines'
import Team from 'containers/info/team'
import FAQs from 'components/info/faqs'
import Ask from 'containers/info/ask'
 

import A from 'components/tags/a'
import I from 'components/tags/i'
import H from 'components/tags/h'
import IMG from 'components/tags/img'
import P from 'components/tags/p'

import style from './_context'


const messages = defineMessages( {

	nojazz_text:{
		id: "nojazz_text",
		description: "P - ",
		defaultMessage: "Hmm, looks like you are using an old browser (or a not so old Internet Explorer). This site will work on your browser BUT IT'S SOO MUCH MORE FUN if you switch to a modern browser, plus you can navegate the coasts of this world. Chrome, Firefox or Safari are safe choices, especially if updated to the latest versions."
	},

	arrow_up_title:{
		id: "arrow_up_title",
		description: "Title - ",
		defaultMessage: "Show intro"
	},

	// INTRO
	help_science:{
		id: "help_science",
		description: "Main Header. Line one",
		defaultMessage: "Help Science study the risks of sea-level rise"
	},
	by:{
		id: "by",
		description: "Main Header. Line two",
		defaultMessage: "by uploading pictures of coasts"
	},
	no_account:{
		id: "no_account",
		description: "Tagline. Informs user that creating an account is not necessary",
		defaultMessage: "No account. Just drag & drop"
	}

} )
 
const context = ( { intl, lang, dir, jazzSupported, clipped, useraction, unclipPage, showDialog } ) => {

	const { formatMessage } = intl

	if( !jazzSupported ){

		return(

			<DIV lang={ lang } dir={ dir } >
				<P className={ style.alert } >{ formatMessage( messages.nojazz_text ) }</P>
				<I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />
				<DIV id="Intro" className={ style.introNoJazz } >
					<IMG src="./assets/coastwards.jpg" alt="Logo coastwards: A turtle on a mission" />
					<H priority={ 1 } ><span>{ formatMessage( messages.help_science ) }</span> <span>{ formatMessage( messages.by ) }</span></H>
					<H priority={ 2 } >{ formatMessage( messages.no_account ) }</H>
				</DIV>
				<DIV id="Info" className={ style.infoNoJazz } >
					<How />
					<Guidelines />
					<Team />
					<FAQs />
					<Ask />
					<P className={ style.logos }>
						<A target="_blank" href="http://www.futureocean.org"><IMG src="assets/Cluster-of-Excellence-The-Future-Ocean.jpg" alt="Cluster of Excellence The Future Ocean" /></A>
						<A target="_blank" href="https://www.uni-kiel.de"><IMG src="assets/Christian-Albrechts-Universität-zu-Kiel.png" alt="Christian Albrechts Universität zu Kiel" /></A>
						<A target="_blank" href="http://www.crslr.uni-kiel.de"><IMG src="assets/Coastal-Risks-And-Sea-Level-Rise-Research-Group.png" alt="Coastal Risks and Sea-Level Rise Research Group" /></A>
					</P>
					<A className={ style.imprint } href="#" onClick={ showDialog.bind( this, 'IMPRINT' ) }>Impressum</A>
				</DIV>
				<Main />
				<Snackbar />
				<Dialog />
			</DIV>

		)

	}else{

		let clsIntro = Classnames( style.intro, {

			[ style.clip ]: clipped

		} )

		let clsInfo = Classnames( style.info, {

			[ style.clip ]: clipped

		} )

		const clsArrowMap = Classnames( style.arrow, style.arrowMap, {

			[ style.fixed ]: clipped,
			[ style.hidden ]: useraction == 'uploading'

		} )

		return(

			<DIV lang={ lang } dir={ dir } >
				<DIV id="Intro" className={ clsIntro }>
					<I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />
					<IMG src="./assets/coastwards.svg" alt="Logo coastwards: A turtle on a mission" className={ style.logo } />
					<H priority={ 1 } className={ style.headline } ><span>{ formatMessage( messages.help_science ) }</span> <span>{ formatMessage( messages.by ) }</span></H>
					<H priority={ 2 } className={ style.tagline } >{ formatMessage( messages.no_account ) }</H>
				</DIV>
				<DIV id="Info"className={ clsInfo }>
					<How />
					<Guidelines />
					<Team />
					<FAQs />
					<Ask />
					<P className={ style.logos }>
						<A target="_blank" href="http://www.futureocean.org"><IMG src="assets/Cluster-of-Excellence-The-Future-Ocean.jpg" alt="Cluster of Excellence The Future Ocean" /></A>
						<A target="_blank" href="https://www.uni-kiel.de"><IMG src="assets/Christian-Albrechts-Universität-zu-Kiel.png" alt="Christian Albrechts Universität zu Kiel" /></A>
						<A target="_blank" href="http://www.crslr.uni-kiel.de"><IMG src="assets/Coastal-Risks-And-Sea-Level-Rise-Research-Group.png" alt="Coastal Risks and Sea-Level Rise Research Group" /></A>
					</P>
					<A className={ style.imprint } href="#" onClick={ showDialog.bind( this, 'IMPRINT' ) }>Impressum</A>
				</DIV>
				<DIV id="Main" className={ style.main }>
					<A onClick={ unclipPage.bind( this ) } className={ clsArrowMap } title={ formatMessage( messages.arrow_up_title ) } >
						<I className="material-icons">&#xE316;</I>
					</A>
					<Main />
				</DIV>
				<Snackbar />
				<Dialog />
			</DIV>

		)

	}

}

context.propTypes = {

	intl: intlShape.isRequired,
	lang: PropTypes.string,
	dir: PropTypes.string,
	jazzSupported: PropTypes.bool,
	clipped: PropTypes.bool,
	useraction: PropTypes.string,

	unclipPage: PropTypes.func,
	showDialog: PropTypes.func

}

export default injectIntl( context )