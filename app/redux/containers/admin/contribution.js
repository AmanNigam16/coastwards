import { connect } from 'react-redux'
import { deleteContribution } from 'actions/admin/admin'

import CONTRIBUTION from 'components/admin/contribution'


const mapStateToProps = ( state ) => {

	return {

		materials: state.materials

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		deleteContribution: ( id, e ) => {

			e.preventDefault()
			
			if ( confirm( 'YOU COMPLETELY SURE YOU WANT TO DELETE THIS CONTRIBUTION?' ) ) {

				dispatch( deleteContribution( id ) )

			} 

		}

	}

}


const contribution = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTRIBUTION )

export default contribution