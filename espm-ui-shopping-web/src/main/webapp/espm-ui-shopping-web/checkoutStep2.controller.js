sap.ui.controller("espm-ui-shopping-web.checkoutStep2", {

	onAfterRendering: function(){

		// initial activation of the next reodmap step and the proceed button
		// one of the two proceed button is not rendered correctly which does not happen if done in the doInit Method => runtime error?
		// but this check needs to be done each time the view is accessed

		var aEmptyFields = sap.app.validator.getEmptyRequiredFields(aEmptyFields, this.getView());

		var bEnabled = aEmptyFields.length == 0 ? true : false;

		sap.app.checkoutController.setNextStepEnabled(bEnabled,"checkout-step-3");

	},

	/**
	 * mapLanguageCountryNames: reads the language dependent country name and adds entries to the countries dropdown listbox
	 */
	mapLanguageCountryNames: function(){
		
		var aCountries = sap.app.countries.getData()["countries"];
		// the json model for the countries is not needed any more
		sap.app.countries = null;
		
		var oCountriesDropdown = sap.ui.getCore().byId("countries-ddlb");
		
		// sort the entries according to the language dependent country names
		var aCountryNames = [];
		var oCountryMap = {};
		var oCountry = {};
		var sCountryName;
		for (var i = 0; i < aCountries.length ; i++){
			oCountry = aCountries[i];
			sCountryName = sap.app.countryBundle.getText(oCountry["key"]);
			oCountryMap[sCountryName] = oCountry;
			aCountryNames.push(sCountryName);
		}
		aCountries= null;
		
		aCountryNames.sort();
		
		for (i = 0; i < aCountryNames.length ; i++){
			oCountry = oCountryMap[aCountryNames[i]];
			var oItem = new sap.ui.core.Item({
				key: oCountry["key"],
				text: aCountryNames[i]
			});
			oCountriesDropdown.addItem(oItem);
		}

	},
	
	/**
	 * presetCountry: tries to sets the selected entry of the dropdown listbox to the country maintained in the settings 
	 */
	presetCountry: function(){

		var oCountriesDropdown = sap.ui.getCore().byId("countries-ddlb");
		var sRegio = sap.ui.getCore().getConfiguration().getLocale().getRegion();
		if (!sRegio){
			sRegio = sap.ui.getCore().getConfiguration().getLanguage();
			sRegio = sRegio.toUpperCase();
		}
		oCountriesDropdown.setSelectedKey( sRegio );
	
	},
	
	/** 
	 * reset all address fields.
	 */
	resetFields: function() {
		
		var field = sap.ui.getCore().byId("addr-firstname");
		field.setValue("");
		
		field = sap.ui.getCore().byId("addr-lastname");
		field.setValue("");
		
		field = sap.ui.getCore().byId("addr-dob");
		field.setValue("");
		
		field = sap.ui.getCore().byId("addr-street");
		field.setValue("");
		
		field = sap.ui.getCore().byId("addr-city");
		field.setValue("");
		
		field = sap.ui.getCore().byId("addr-zipcode");
		field.setValue("");		
	}

});
