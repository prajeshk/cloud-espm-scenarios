/** validator.js
 *
 *  holds validation routines
 */

jQuery.sap.declare("sap.app.validator");
jQuery.sap.require("sap.app.messages");

// some basic evaluation functions for consistency check of user input
sap.app.validator = {

	/**
	 * checkEmail: event handler for the e-mail address field
	 * @param oEvent
	 */
	checkEmail : function( oEvent ){
		var oTextField = oEvent.getSource();
		// the entry for e-mail should contain the at symbol ("@"), characters before and after the "@", a dot and characters after the dot
		//var validRegex = /.+@.+\..+/;
		var validRegex = /^[a-zA-Z0-9][\w\.-]*@(?:[a-zA-Z0-9][a-zA-Z0-9_-]+\.)+[A-Z,a-z]{2,5}$/;
		if (!validRegex.test( oTextField.getValue())){
			oTextField.setValueState( sap.ui.core.ValueState.Error );
			var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_EMAIL_NOT_VALID").replace(/&1/, "'" + oTextField.getValue() + "'");
			sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , oTextField.getId());
			sap.app.checkoutController.setNextStepEnabled(false, "checkout-step-3");
		}else{
			oTextField.setValueState( sap.ui.core.ValueState.None );
			sap.app.messages.removeMessage( oTextField.getId() );
			sap.app.checkoutController.setNextStepEnabled(true, "checkout-step-3");
		}
	},
	
	/**
	 * checkQuantity: event handler for the quantity field
	 * @param oEvent
	 */
	checkQuantity : function(oEvent){

		var quantity = oEvent.currentTarget.value;
		if (!quantity){
			return;
		}
		var sFieldId = oEvent.currentTarget.id;

		if (isNaN(quantity) || quantity == 0 || quantity >9999 ){

			sap.ui.getCore().byId(sFieldId).setValueState( sap.ui.core.ValueState.Error );

			if (quantity != 0){
				var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_VALUE_NOT_VALID").replace(/&1/, "'" + quantity + "'");
			}else{
				var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_VALUE_NOT_GREATER_ZERO");
			}

			sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , sFieldId);

		}else{

			sap.ui.getCore().byId(sFieldId).setValueState( sap.ui.core.ValueState.None );

			sap.app.messages.removeMessage( sFieldId );

		}

	},

	/**
	 * checkRequiredFields: checks if all mandatory input fields on a view have a value
	 * @param oEvent
	 */
	checkRequiredFields: function(oEvent){
		// currently only used by the address view of the roadmap control of the checkout
		if (oEvent && oEvent.keyCode == 13){  //enter key
			var bMarkEmptyFields = true;
		}

		oView = this;

		var aEmptyFields = sap.app.validator.getEmptyRequiredFields(aEmptyFields, oView, bMarkEmptyFields);

		var bEnabled =	 aEmptyFields.length == 0 ? true : false;

		if (!bEnabled &&  bMarkEmptyFields){
			sap.app.messages.addMessage(sap.app.i18n.getProperty("MSG_ERROR_FILL_ALL_REQUIRED_FIELDS"), sap.ui.core.MessageType.Error , "REQUIRED_FIELDS");
		}

		if (bEnabled){
			sap.app.messages.removeMessage( "REQUIRED_FIELDS" );
		}

		sap.app.checkoutController.setNextStepEnabled(bEnabled,oView.getId());

	},

	/**
	 * getEmptyRequiredFields: returns all empty mandatory input fields of a vuew
	 * @param aEmptyFields
	 * @param oControl
	 * @param bMarkEmptyFields
	 * @returns {Array}
	 */
	getEmptyRequiredFields: function(aEmptyFields, oControl, bMarkEmptyFields){

		if (!aEmptyFields){
			var aEmptyFields = [];
		}

		var aContent = null;
		
		// check if the control has a property Visible with call of oControl.getVisible, call the getter getVisible() only if property is present
		if ( oControl.getVisible ){
			if (oControl.getVisible() == false){
				return;
			}
		};

		if (oControl instanceof sap.ui.commons.layout.MatrixLayout){
			aContent = oControl.getRows();
		}
		if (oControl instanceof sap.ui.commons.layout.MatrixLayoutRow){
			aContent = oControl.getCells();
		}
		if (oControl.getAggregation("content")){
			aContent = oControl.getContent();
		}

		for (var i = 0; i< aContent.length; i++){

			var oContent = aContent[i];
			var bRecurse = false;

			if ( oContent.getVisible ){
				
				if (oContent.getVisible() == false){
					break;
				}
			}

			if (oContent instanceof sap.ui.commons.layout.MatrixLayout){
				bRecurse = true;
			}
			if (oContent instanceof sap.ui.commons.layout.MatrixLayoutRow){
				bRecurse = true;
			}
			if ( oContent.getAggregation("content") ){
				bRecurse = true;
			}

			if ( bRecurse ){
				this.getEmptyRequiredFields(aEmptyFields, oContent , bMarkEmptyFields);
			}

			var oField = aContent[i];
			if (oField instanceof sap.ui.commons.TextField){
				if (oField.getRequired() && oField.getVisible()){
					var value = oField.getLiveValue();
					if (!value){
						aEmptyFields.push(oField);
						if (bMarkEmptyFields){
							oField.setValueState(sap.ui.core.ValueState.Error);
						}
					}else{
						oField.setValueState(sap.ui.core.ValueState.None);
					}
				}
			}

		}
		
		return aEmptyFields;

	}
};
