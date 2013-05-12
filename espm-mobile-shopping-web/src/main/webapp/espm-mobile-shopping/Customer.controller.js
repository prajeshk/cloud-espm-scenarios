jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("espm-mobile-shopping.Customer", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {
		//handle data binding validation results
		sap.ui.getCore().attachValidationError(
				function(evt) {
					var element = evt.getParameter("element");
					if (element.setValueState) 
						element.setValueState(sap.ui.core.ValueState.Error);
				}
		);
		sap.ui.getCore().attachValidationSuccess(                       
				function(evt) {
					var element = evt.getParameter("element");
					if (element.setValueState) {
						element.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
	},

	onBeforeShow : function(evt) {
		var view = this.getView();
		view.radioButton1.setSelected(true);
		//appC.oModel.refreshSecurityToken();
	},

	//navigation for shippingDetails page (for new customer) or navigation for creditCardDetails page (for existing customer) 
	proceedTap : function(evt) { 
		var emailText = appC.i18n.getProperty("CUST_EMAIL");
		var view = this.getView();
		appC.email = view.emailInp.getValue();
		var sFilterString= emailText + appC.email + "'";
		var aParams =[];
		aParams.push (sFilterString);
		if (appC.email != ""){   
			view.emailInp.setValueState(sap.ui.core.ValueState.None);
			if(view.radioButton1.getSelected()==true ){
				appC.oModel.read(sap.app.config.getCustomerByEmailAddress, null, aParams , false, function(oData, oResponse){ 
					var param = { details : oResponse.data };
					appC.navTo("CreditCardDetails", true, undefined, param);
				},function(oError){ 
					//When Customer with this Email id does not exists 
					if(oError.response.statusCode=="400"){
						sap.m.MessageBox.show(
								"{i18n>DIALOG_TEXT1}",
								sap.m.MessageBox.Icon.ERROR, 
								"{i18n>DIALOG_TITLE}",  
								[sap.m.MessageBox.Action.OK]
						);
					}
				});
			}else if(view.radioButton2.getSelected()==true){
				appC.oModel.read(sap.app.config.getCustomerByEmailAddress, null, aParams , false, function(oData, oResponse){ 
					if(oResponse.statusCode=="200"){
						//if Customer exists then this message box will open				
						sap.m.MessageBox.show(
								"{i18n>DIALOG_TEXT3}",
								sap.m.MessageBox.Icon.ERROR, 
								"{i18n>DIALOG_TITLE}",  
								[sap.m.MessageBox.Action.OK]
						);			
					}else{
						//do nothing 
					}
				},function(oError){ 
					//When Customer with this Email id does not exists i.e. when statusCode=400 
					appC.navTo("ShippingDetails", true, undefined,appC.email);
				});
			}
		}else{
			//when email address is not entered
			view.emailInp.setValueState(sap.ui.core.ValueState.Error);
//			sap.m.MessageBox.show(
//					"{i18n>DIALOG_TEXT2}",
//					sap.m.MessageBox.Icon.ERROR, 
//					"{i18n>DIALOG_TITLE}",  
//					[sap.m.MessageBox.Action.OK]
//			);
		}
	},

	//navigation to previous page
	navButtonTap : function(evt) { 
		appC.navBack();
	},

	inputChangeTap: function(evt){
		if(evt.oSource.getValue() != null){
			evt.oSource.setValueState(sap.ui.core.ValueState.None);
		}
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
//	onAfterRendering: function() {

//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
//	onExit: function() {

//	}

});