import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import P from 'components/tags/p'
import H from 'components/tags/h'
import A from 'components/tags/a'
import STRONG from 'components/tags/strong'
import BR from 'components/tags/br'
import IMG from 'components/tags/img'
import DIV from 'components/tags/div'

import Logos from 'containers/info/logos'

import style from './_team'

const messages = defineMessages( {

	who_are_you:{
		id: "who_are_you",
		description: "Section header - Who is Science?",
		defaultMessage: "Who's Science?"
	},
	who_are_you_title:{
		id: "who_are_you_title",
		description: "Section header - Meet us!",
		defaultMessage: "Meet us!"
	},
	we_are:{
		id: "we_are",
		description: "Paragraph",
		defaultMessage: "We are the {crslr} at the University of Kiel in Germany and this project is funded by the {future_ocean}."
	},

	//team
	more:{
		id: "more",
		description: "Team",
		defaultMessage: "More"
	},
	more_title:{
		id: "more_title",
		description: "Title - ",
		defaultMessage: "A bit more official ..."
	},

	nassos:{
		id: "nassos",
		description: "Team",
		defaultMessage: "Nassos is the group leader and a professor at the University of Kiel. He's Greek, has two little boys and his desk looks like hell."
	},
	claudia:{
		id: "claudia",
		description: "Team",
		defaultMessage: "Claudia is a Doctoral Researcher and the rising star who will turn your images into something meaningful. She's a charming tough questioner and eager to learn for herself. She's also always the first to laugh."
	},
	/*joern:{
		id: "joern",
		description: "Team",
		defaultMessage: "Jörn is probably the least stressed father of 4 you have ever met. He's very tall with hair down to his hips and kindly stoops down when he talks to people."
	},*/
	me:{
		id: "me",
		description: "Team",
		defaultMessage: "That's me. I created this website with a lot of love and endless hours of just staring at it. (Developers: Node, React and Redux ROCK!)"
	},

	//and
	contact_here:{
		id: "contact_here",
		description: "Contact",
		defaultMessage: "Contact us here"
	},
	special_thanks:{
		id: "special_thanks",
		description: "H",
		defaultMessage: "Special thanks to"
	},
	claudio:{
		id: "claudio",
		description:"P",
		defaultMessage: "For translating this site into Spanish"
	},
	bassel:{
		id: "bassel",
		description:"P",
		defaultMessage: "For translating this site into Arabic"
	},
	pholpo:{
		id: "pholpo",
		description: "P - ",
		defaultMessage: "For the explanatory video and general support"
	}

} )

const team = ( { intl, jazzSupported } ) => {

	const { formatMessage } = intl

	if( !jazzSupported ){

		return(

			<DIV id="Team" className={ style.noJazz } >
				<H priority={ 3 } >{ formatMessage( messages.who_are_you ) }</H>
				<FormattedMessage
					id="we_are"
					values={ { 
						crslr: <a href="http://www.crslr.uni-kiel.de/en/people/" target="_blank" title="Coastal Risks and Sea-level Rise Research Group" >Coastal Risks and Sea-level Rise Research Group</a>, 
						future_ocean: <a href="http://www.futureocean.org" target="_blank" title="Cluster of Excellence 'The Future Ocean'" >Cluster of Excellence "The Future Ocean"</a>
					} }
				/>
			</DIV>

		)

	}else{

		return (

			<DIV className={ style.team }>
				<DIV className={ style.box } >
					<H priority={ 3 } >{ formatMessage( messages.who_are_you ) }</H>
					<P className={ style.intro } >
						<FormattedMessage
							id="we_are"
							values={ { 
								crslr: <a href="http://www.crslr.uni-kiel.de/en/people/" target="_blank" title="Coastal Risks and Sea-level Rise Research Group" >Coastal Risks and Sea-level Rise Research Group</a>, 
								future_ocean: <a href="http://www.futureocean.org" target="_blank" title="Cluster of Excellence 'The Future Ocean'" >Cluster of Excellence "The Future Ocean"</a>
							} }
						/>	
					</P>
				</DIV>
			</DIV>

		)

	}



}

team.propTypes = {

	intl: intlShape.isRequired,

	jazzSupported: PropTypes.bool

}

export default injectIntl( team ) 


/*<TOGGLE id="Team" title={ formatMessage( messages.who_are_you_title ) } priority={ 3 } text={ formatMessage( messages.who_are_you ) } className={ style.toggle } >
				<FormattedMessage
					id="we_are"
					values={ { 
						crslr: <a href="http://www.crslr.uni-kiel.de/en/people/" target="_blank" title="Coastal Risks and Sea-level Rise Research Group" >Coastal Risks and Sea-level Rise Research Group</a>, 
						future_ocean: <a href="http://www.futureocean.org" target="_blank" title="Cluster of Excellence 'The Future Ocean'" >Cluster of Excellence "The Future Ocean"</a>
					} }
				/>
				<BR/><BR/><BR/>
				<DIV className={ style.person }>
					<IMG src="assets/team/nassos.jpg" alt="Athanasios Vafeidis" />
					<H priority={ 4 }>Athanasios Vafeidis</H>
					<P>{ formatMessage( messages.nassos ) } <A href="http://www.crslr.uni-kiel.de/en/people/gruppenleiter/prof.-athanasios-vafeidis.html" target="_blank" title={ formatMessage( messages.more_title ) } >{ formatMessage( messages.more ) }</A></P>
				</DIV>
				<DIV className={ style.person }>
					<IMG src="assets/team/claudia.jpg" alt="Claudia  Wolff" />
					<H priority={ 4 }>Claudia  Wolff</H>
					<P>{ formatMessage( messages.claudia ) } <A href="http://www.crslr.uni-kiel.de/en/people/doctoral-researchers/claudia-wolff.html" target="_blank" title={ formatMessage( messages.more_title ) } >{ formatMessage( messages.more ) }</A></P>
				</DIV>
				<DIV className={ style.person }>
					<IMG src="assets/team/maureen.jpg" alt="Maureen Tsakiris" />
					<H priority={ 4 }>Maureen Tsakiris</H>
					<P>{ formatMessage( messages.me ) } <A href="http://www.crslr.uni-kiel.de/en/people/affiliated/maureen-tsakiris.html" target="_blank" title={ formatMessage( messages.more_title ) } >{ formatMessage( messages.more ) }</A></P>
				</DIV>
				<BR/><BR/>
				<P><STRONG>{ formatMessage( messages.contact_here ) }:</STRONG> <A target="_self" href="mailTo:go@coastwards.org" >go@coastwards.org</A></P> 
				<BR/>
				<TOGGLE id="Team" priority={ 5 } text={ formatMessage( messages.special_thanks ) } >

					<P><A href="http://www.pholpo.net/" target="_blank">Nicola Scodellaro & Sara Zampieri • pholpo GbR</A> - { formatMessage( messages.pholpo ) }</P>
					<P><A href="https://www.linkedin.com/in/claudio-molinari-4a9a472?trk=hp-identity-name" target="_blank">Claudio Molinari</A> - { formatMessage( messages.claudio ) }</P>
					<P><A href="https://github.com/basselAlshK" target="_blank">Bassel Alsheekh Kassem</A> - { formatMessage( messages.bassel ) }</P>

				</TOGGLE>
			</TOGGLE>*/