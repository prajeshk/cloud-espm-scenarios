/** messages.js
 *
 *  holds messaging routines
 */

jQuery.sap.declare("sap.app.messages");

// some elementary functions for message handling (messages in the notification bar)
sap.app.messages = {

	/**
	 * addMessage: adds or updates a single message in the notification bar
	 * @param sMessageText: text of the message
	 * @param sMessageType: error, warning or success
	 * @param sFieldId: identifier of the field causing the message
	 */
	addMessage: function(sMessageText, sMessageType, sFieldId) {

		var oNotifier = sap.ui.getCore().byId("main").getNotificationBar( ).getMessageNotifier();
		if (!oNotifier){
			return;
		}

		var oMessage;

		// check if the message for that fieldId is already contained in the messages
		var aMessages = oNotifier.getMessages();
		for (var i = 0; i< aMessages.length; i++){
			oMessage = aMessages[i];
			if (oMessage["Field"] ==  sFieldId){
				// update the message text for that field with the current text
				oMessage.setText(sMessageText);
				return;
			}
		}

		// message for that fieldId not yet existing, create and add a new message for that fieldId
		var sIconSrc = null;

		switch (sMessageType){
			case sap.ui.core.MessageType.Error:
				sIconSrc = "images/iconError.gif";
				break;
			case sap.ui.core.MessageType.Information:
				sIconSrc = "images/iconSuccess.gif";
				break;
			case sap.ui.core.MessageType.Success:
				sIconSrc = "images/iconSuccess.gif";
				break;
			case sap.ui.core.MessageType.Warning:
				sIconSrc = "images/iconWarnung.gif";
				break;
		};

		oMessage = new sap.ui.core.Message({
			icon : sIconSrc,
			text : sMessageText,
			level : sMessageType
		});

		oMessage["Field"] = sFieldId;

		oNotifier.addMessage( oMessage );

	},

	/**
	 * removeAllMessages: clears all messages in the notification bar
	 */
	removeAllMessages : function(){

		var oNotifier = sap.ui.getCore().byId("main").getNotificationBar( ).getMessageNotifier();
		if (oNotifier){
			oNotifier.removeAllMessages();
		}
	},
	
	/**
	 * hasMessages: checks if the notification bar contains messages
	 * @returns {Boolean}
	 */
	hasMessages: function(){
		if (sap.ui.getCore().byId("main").getNotificationBar( ).getMessageNotifier().hasItems()){
			return true;
		}else{
			return false;
		}
	},

	/**
	 * removeMessage: removes a single message from the notification bar based on sFieldId
	 * @param sFieldId:  identifier of the field causing the message
	 */
	removeMessage : function(sFieldId){

		var oNotifier = sap.ui.getCore().byId("main").getNotificationBar( ).getMessageNotifier();
		if (!oNotifier){
			return;
		}

		var aMessages = oNotifier.getMessages();
		for (var i = 0; i< aMessages.length; i++){
			var oMessage = aMessages[i];
			if (oMessage["Field"] == sFieldId ){
				oNotifier.removeMessage(oMessage);
				return;
			}
		}
	},
	
	/**
	 * removeMessageByInstance: removes a single message from the notification bar based on message instance
	 * @param oMessageDel: instance of the message to be removed
	 */
	removeMessageByInstance: function(oMessageDel){
		var oNotifier = sap.ui.getCore().byId("main").getNotificationBar( ).getMessageNotifier();
		if (!oNotifier){
			return;
		}

		var aMessages = oNotifier.getMessages();
		for (var i = 0; i< aMessages.length; i++){
			var oMessage = aMessages[i];
			if (oMessage == oMessageDel){
				oNotifier.removeMessage(oMessage);
				return;
			}
		}
	},

	/**
	 * getMessagesOfView: returns all messages for a view
	 * @param sView
	 * @returns {Array}
	 */
	getMessagesOfView: function(sView){
		var oNotifier = sap.ui.getCore().byId("main").getNotificationBar( ).getMessageNotifier();
		if (!oNotifier){
			return;
		}
		// the dynamic attribute "Field" of error messages begin with the view name
		var aErrors = [];
		var aMessages = oNotifier.getMessages();
		for (var i = 0; i< aMessages.length; i++){
			var oMessage = aMessages[i];
			var sFieldId = oMessage["Field"];
			var sBegin = sFieldId.slice(0, sFieldId.indexOf("-"));
			if ( sBegin == sView ){
				aErrors.push( oMessage );
			}
		}

		return aErrors;

	},

	/**
	 * addNotifier: adds an additional notifier to the notification bar
	 * @param sTitle
	 */
	addNotifier : function(sTitle){

		sap.ui.getCore().byId("main").getNotificationBar( ).addNotifier( new sap.ui.ux3.Notifier({ title:  sTitle }) );

	},

	/**
	 * handleMessageSelected: event handler when message is clicked
	 * @param oEvent
	 */
	handleMessageSelected: function(oEvent){
		// if a message is clicked, the field with the wrong input gets the focus
		// the custom data property "Field" of the message is equal to the id of the text field which causes the error message
		var oMessage = oEvent.getParameter("message");
		var sId = oMessage["Field"];
		var oTextField = sap.ui.getCore().byId(sId);
		// the messsage is not alway connected to a particular field
		if (oTextField){
			oTextField.focus();			
		}
	}

};

