sap.ui.controller("espm-ui-shopping-web.checkoutStep3", {

	onBeforeRendering: function(){
		
		// reset credit card information for a new customer
		var cardOwner = sap.app.checkoutController.getView().getModel().getProperty("/payment/cardOwner");
		var oCustomer = sap.app.checkoutController.getView().getModel().getProperty("/customer");
		if (!cardOwner || cardOwner !== (oCustomer.FirstName + " " + oCustomer.LastName)) {			
			sap.app.checkoutController.getView().getModel().setProperty("/payment/cardOwner", 
					oCustomer.FirstName + " " + oCustomer.LastName );
			sap.app.checkoutController.getView().getModel().setProperty("/payment/cardNumber", "");
			sap.app.checkoutController.getView().getModel().setProperty("/payment/cardSecurityCode", "");
		} 
		
	},
	
	onAfterRendering: function(){
		// initial activation of the next roadmap step and the proceed button
		// one of the two proceed button is not rendered correctly which does not happen if done in the doInit Method => runtime error?
		// but this check needs to be done each time the view is accessed

		var aEmptyFields = sap.app.validator.getEmptyRequiredFields(aEmptyFields, this.getView());
		var bEnabled =	 aEmptyFields.length == 0 ? true : false;
		sap.app.checkoutController.setNextStepEnabled(bEnabled,"checkout-step-4");

	}

});
