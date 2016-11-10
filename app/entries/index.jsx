import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import Classnames from 'classnames'

import coastwards from 'reducers'
import { loadLanguage } from 'actions/i18n/i18n'
import { showDialog } from 'actions/ui/dialog'

import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context/context'
import Main from 'containers/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'

import I18nLinks from 'components/i18n/i18nLinks'
import Intro from 'components/intro'
import How from 'components/how'
import Guidelines from 'components/guidelines'
import Team from 'containers/team'
import FAQs from 'components/faqs'
import Ask from 'containers/ask'

import DIV from 'components/tags/div'


//TODO: i18nLinks should handle that itself?
import i18nLocales from 'actions/i18n/i18nLocales'

import style from './_index'


const store = createStore( coastwards, compose(

	applyMiddleware( thunk ),
	window.devToolsExtension ? window.devToolsExtension() : ( f ) => f

) )


//load negotiated language
const [ navigatorLocale ] = window.navigator.language.split ( '-' )
const negotiatedLocale = document.documentElement.getAttribute( 'lang' )
store.dispatch( loadLanguage( negotiatedLocale || navigatorLocale ) )

const state = store.getState()
const { jazzSupported } = state.browser

if( !jazzSupported ){

	store.dispatch( showDialog( 'NOJAZZ' ) )

}else{

	//store.dispatch( showDialog( 'TESTSITE' ) )

}

// <I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />

let clsIntro = Classnames( style.intro, {

	[ style.introJazz ]: jazzSupported

} )

let clsInfo = Classnames( style.info, {

	[ style.infoJazz ]: jazzSupported

} )

ReactDom.render( 

	<Provider store={ store } >
		<I18nProvider>
			<Context>
				<DIV className={ style.top } >
					<Intro className={ clsIntro } />
					<DIV className={ clsInfo } >
						<How />
						<Guidelines />
						<Team />
						<FAQs />
						<Ask />
					</DIV>
				</DIV>
				<Main className={ style.main } />
				<Snackbar />
				<Dialog />
			</Context>
		</I18nProvider>
	</Provider>, 
	document.getElementById( 'Body' ) 

); 