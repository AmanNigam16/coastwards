import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import { Button } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
const TooltipButton = Tooltip( Button );

import style from './_styleUpload';

import FormTB from '../../utils/FormTB/FormTB/FormTB';
import DropzoneTB from '../../utils/FormTB/DropzoneTB/DropzoneTB';
import MapboxGL from '../../utils/MapboxGL/MapboxGL';
import FeatureDialog from './FeatureDialog';

const messages = defineMessages( {

	/*dropzone_prompt_drag:{
		id: "dropzone_prompt_drag",
		description: "0 - ",
		defaultMessage: "Drag your images anywhere onto the map (or click the big red button)"
	},*/
	dropzone_prompt_drop:{
		id: "dropzone_prompt_drop",
		description: "0 - ",
		defaultMessage: "And now drop!"
	},
	/*dropzone_prompt_click:{
		id: "dropzone_prompt_click",
		description: "0 - ",
		defaultMessage: "Click anywhere to upload your pictures"
	},*/
	dropzone_prompt_blocked:{
		id: "dropzone_prompt_blocked",
		description: "0 - ",
		defaultMessage: "Processing ... please wait until finished to drop more images"
	},
	dropzone_warning_accept:{
		id: "warning_accept",
		description: "0 - ",
		defaultMessage: "One or more files are not images and will be ignored!"
	},
	dropzone_warning_max:{
		id: "warning_max",
		description: "0 - ",
		defaultMessage: "Sorry, we can only process one image at a time! (We are working on it)" 
	},
	mapbox_warning_unsupported_title:{
		id: "mapbox_warning_unsupported_title",
		description: "1 - ",
		defaultMessage: "That's too bad ..."
	},
	mapbox_warning_unsupported_message:{
		id: "mapbox_warning_unsupported_message",
		description: "1 - ",
		defaultMessage: "Your browser does not support the web technology necessary to display the world map. We recommend you upgrade your browser to the latest version!"
	},
	mapbox_dialog_action_label:{
		id: "mapbox_dialog_action_label",
		description: "0 - ",
		defaultMessage: "Close"
	},
	button_zoom_in:{
		id: "button_zoom_in",
		description: "0 - ",
		defaultMessage: "Zoom in"
	},
	button_zoom_out:{
		id: "button_zoom_out",
		description: "0 - ",
		defaultMessage: "Zoom out"
	},
	button_fit_world:{
		id: "button_fit_world",
		description: "0 - ",
		defaultMessage: "Fit world"
	},
	button_upload_image:{
		id: "button_upload_image",
		description: "0 - ",
		defaultMessage: "Upload an image"
	}
	

} );

class Upload extends Component {

	componentDidMount (){

		window.addEventListener( 'dragenter', ( e ) => {

			e = e || event;
			e.preventDefault();

			this.setState( { noEvents: false } );

		}, false );

		window.addEventListener( 'dragleave', ( e ) => {

			e = e || event;
			e.preventDefault();

			this.setState( { noEvents: true } );

		}, false );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.map;

		this.state = {

			noEvents: true,
			showDialog: false,
			feature: undefined
		} 

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;
		const { className } = this.props;
		const { noEvents, showDialog, feature } = this.state;

		const cls = Classnames( style.upload, className );
		const clsForm = Classnames( style.fill, {

			[ style.noEvents ]: noEvents 

		} );
		const clsMap = Classnames( style.fill, style.map );

		const fileValidations = [
			{
				methodName: "imageHasLocation",
				options: { required: true, passesWhen: true },
				label: "Location",
				description: "Checking image for information on the location it was taken",
				success: "Yay! We know where that coast is",
				error: "Err, looks like we can't extract the location from the metadata"
			},
			{
				methodName: "imageWithFlash",
				options: { required: true, passesWhen: false },
				label: "No flash",
				description: "Checking whether the image was taken with flash",
				success: "Great! No flash, that means it was probably taken with enough ambient light",
				error: "Err, flash was used to take this image"
			},
			{
				methodName: "imageHasColor",
				options: { color: "blue", required: true, passesWhen: true },
				label: "Color blue",
				description: "Checking whether the image has the color blue (water)",
				success: "Great! There is blue in the image.",
				error: "We couldn't find the color blue"
			}
		]

		const geoJSON = {

			"type": "FeatureCollection",
			"features": [ {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [ -77.03238901390978, 38.913188059745586 ]
				},
				"properties": {
					"marker-symbol": "marker",
					"comment": "I used to go to this beach as a child. Since then it has changed so much.",
					"image": "./uploads/01.jpg"
				}
			}, {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [ -122.414, 37.776 ]
				},
				"properties": {
					"marker-symbol": "marker",
					"comment": "I used to go to this beach as a child. Since then it has changed so much.",
					"image": "./uploads/05.jpg"
				}
			} ]

		}

		const markerSource = { 

			type: 'geojson',
			data: geoJSON

		}

		const markerLayer = {

			type: 'symbol',
			layout: {

				'icon-image': "{marker-symbol}-11"

			}

		}

		
		return (

			<div id="Upload" className={ cls }>
				<MapboxGL
					returnMap={ this._setMap }
					className={ clsMap }
					unsupportedTitle={ formatMessage( messages.mapbox_warning_unsupported_title ) }
					unsupportedMessage={ formatMessage( messages.mapbox_warning_unsupported_message ) }
					/*language={ locale }*/
					zoom={ 0 }
					minZoom={ 0 }
					maxZoom={ 22 }
					center={ [ 150, 39 ] }
					maxBounds={ [ [ 360, 84 ], [ -360, -68 ] ] }
					attributionControl={ false }
					style="mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02"
					accessToken="pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw"
					layers={ [

						{
							name: 'markers',
							source: markerSource,
							layer: markerLayer,
							position: 'place_label_other',
							onClick: this._showDialog

						}

					] }

				/>
				<FormTB name="upload" className={ clsForm } >
					<DropzoneTB
						name="dropzone"
						ref="dropzone"
						className={ style.dropzone }
						multiple={ false }
						max={ 1 }
						warning_max={ formatMessage( messages.dropzone_warning_max ) }
						warning_accept={ formatMessage( messages.dropzone_warning_accept ) }			
						fileValidations={ fileValidations }
						zoneProps={ {

							clsZone: style.zone,
							clsZoneEnter: style.zoneEnter,
							clsZoneBlocked: style.zoneBlocked,
							promptDrag: "",
							promptDrop: formatMessage( messages.dropzone_prompt_drop ),
							promptClick: ""

						} }
						
					/>
				</FormTB>
				<div id="Controls" className={ style.controls } >
					<TooltipButton tooltip={ formatMessage( messages.button_upload_image ) } tooltipDelay={ 1000 } icon="file_upload" floating mini accent onClick={ this._openInput } />
					<TooltipButton tooltip={ formatMessage( messages.button_zoom_in ) } tooltipDelay={ 1000 } icon="add" floating mini onClick={ this._zoomIn } />
					<TooltipButton tooltip={ formatMessage( messages.button_zoom_out ) } tooltipDelay={ 1000 } icon="remove" floating mini onClick={ this._zoomOut } />
					<TooltipButton tooltip={ formatMessage( messages.button_fit_world ) } tooltipDelay={ 1000 } icon="public" floating mini onClick={ this._showWorld } />
				</div>
				<FeatureDialog label={ formatMessage( messages.mapbox_dialog_action_label ) } onClick={ this._hideDialog } active={ showDialog } feature={ feature } />
			</div>

		)

	}

	_setMap = ( e ) => {

		this.map = e;

	}

	_zoomIn = ( ) => {

		let m = this.map;
		let currentZoom = m.style.z;
		let maxZoom = m.transform._maxZoom;
		let zoom = currentZoom + 1 < maxZoom ? currentZoom + 1 : maxZoom;
		this.map.zoomTo( zoom );

	}

	_zoomOut = ( ) => {

		let m = this.map;
		let currentZoom = m.style.z;
		let minZoom = m.transform._minZoom;
		let zoom = currentZoom - 1 > minZoom ? currentZoom - 1 : minZoom;
		this.map.zoomTo( zoom );

	}

	_showWorld = ( ) => {

		this.map.zoomTo( 0 );

	}

	_showDialog = ( feature ) => {

		this.setState( { feature: feature, showDialog: true } );

	}

	_hideDialog = ( ) => {

		this.setState( { showDialog: false } );

	}

	_openInput = ( ) => {

		console.log( this.refs.dropzone._openInput );

	}

}  

Upload.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

};

Upload.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Upload );
