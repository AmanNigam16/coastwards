import { connect } from 'react-redux'

import { resetForm } from 'actions/main'
import STATUSES from 'components/statuses'


const mapStateToProps = ( state ) => {

	return {

		status: state.status

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		resetForm: ( ) => {

			dispatch( resetForm() )

		}

	}

}


const statuses = connect(

	mapStateToProps,
	mapDispatchToProps

)( STATUSES )

export default statuses