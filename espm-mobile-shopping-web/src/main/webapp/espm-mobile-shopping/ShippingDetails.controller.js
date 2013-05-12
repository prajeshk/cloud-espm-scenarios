sap.ui.controller("espm-mobile-shopping.ShippingDetails", {


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
		appC.oModel.refreshSecurityToken();
		var view = this.getView();
		var sInputCountry = window.localStorage.getItem("BUSINESS_PARTNER_COUNTRY");
		if (sInputCountry) {
			if (sInputCountry == 'IN') {
				view.sCountry.getContent()[0].setSelectedItem("item1");
			}else {
				view.sCountry.getContent()[0].setSelectedItem("item2");
			}
		}	
	},

	//Clicking on the Proceed button
	proceedTap : function(evt) { 
		var successMsg= appC.i18n.getProperty("CUST_ID_VALID");
		var errorMsg = appC.i18n.getProperty("CUST_ID_INVALID");
		var view = this.getView();
		var oEntry = {};
		var flag = 0;
		var inputs = [ 
		              view.sFirstName.getContent()[0],
		              view.sLastName.getContent()[0],
		              view.sDateOfBirth.getContent()[0],
		              view.sPhone.getContent()[0],
		              view.sStreet.getContent()[0],
		              view.sCity.getContent()[0],
		              view.sZipCode.getContent()[0]	              
		              ];

		for (var i=0 ; i < inputs.length ; i++) {
			if(!inputs[i].getValue()){
				inputs[i].setValueState(sap.ui.core.ValueState.Error);
				flag = 1;
			}
		}
		if(flag == 0){
			var fName = view.sFirstName.getContent()[0].getValue();
			oEntry.FirstName = fName;

			var lName = view.sLastName.getContent()[0].getValue();
			oEntry.LastName = lName;

			var dobInp = view.sDateOfBirth.getContent()[0].getValue();
			var date = new Date(dobInp);
			var dobYear = date.getFullYear();
			var dobMonth = ("0" + (date.getMonth() + 1).toString()).substr(-2);
			var dobDate =  ("0" + date.getDate().toString()).substr(-2);
			var dob = dobYear + "-" + dobMonth + "-" + dobDate;
			oEntry.DateOfBirth = dob+'T00:00';

			var phone = view.sPhone.getContent()[0].getValue();
			oEntry.PhoneNumber = phone;

			oEntry.EmailAddress = appC.email;

			var street = view.sStreet.getContent()[0].getValue();
			oEntry.Street = street;

			var city = view.sCity.getContent()[0].getValue();
			oEntry.City = city;

			var country = view.sCountry.getContent()[0].getSelectedItem().data("code");
			oEntry.Country = country;

			var zip = view.sZipCode.getContent()[0].getValue();
			oEntry.PostalCode = zip;

			appC.oModel.refreshSecurityToken();
			//using OData model for Customer creation
			appC.oModel.create(sap.app.config.customerCollection, oEntry, null, function(oData, oResponse){ 
				//Customer Creation successful
				sap.m.MessageToast.show(successMsg);
				var param = { details : oResponse.data };
				appC.navTo("CreditCardDetails", false, undefined, param);
			},function(oError){ 
				//Customer Creation Failed
				sap.m.MessageToast.show(errorMsg);
			});
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