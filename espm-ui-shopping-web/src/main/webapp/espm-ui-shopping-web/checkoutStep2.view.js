sap.ui.jsview("espm-ui-shopping-web.checkoutStep2", {

	getControllerName : function() {
		return "espm-ui-shopping-web.checkoutStep2";
	},

	createContent : function(oController) {

		var oMatrix = new sap.ui.commons.layout.MatrixLayout({ id: "address" , width:"650px"});

		var oFieldEmail = new sap.ui.commons.TextField({
			id: "address-email",
			value: "{EmailAddress}",
			width: "200px",
			required: true,
			change : function( oEvent){
				sap.app.validator.checkEmail( oEvent );
			}
		});

		var oLabelEmail = new sap.ui.commons.Label({
			labelFor: oFieldEmail,
			text: "{i18n>LBL_EMAIL}"
		});

		var oRadioButtons = new sap.ui.commons.RadioButtonGroup({
			id : "rbg_customer",
			items : [ new sap.ui.core.Item({
				id : "existing_customer",
				text : "{i18n>LBL_EXISTING_CUSTOMER}", // string
				key : "existing_customer"
			}), new sap.ui.core.Item({
				id : "new_customer",
				text : "{i18n>LBL_NEW_CUSTOMER}", // string
				key : "new_customer"
			}) ],
			select : [ function(oEvent) {
				// remove messages related to the email
				sap.app.messages.removeMessage("address-email");
				var control = oEvent.getSource();
				var sSelectedItem = control.getSelectedItem().getId();
				if (sSelectedItem == "new_customer") {
					this.addAddressFields();
					
					// reset the fields
					this.getController().resetFields();
					
					// we set the selected key after hte ddlb is added because otherwise it will be overwritten by the
					// binding...
					this.getController().presetCountry();
				}
				if (sSelectedItem == "existing_customer") {
					this.removeAddressFields();
				}
				var aEmptyFields = sap.app.validator.getEmptyRequiredFields(aEmptyFields, this);
				var bEnabled = aEmptyFields.length == 0 ? true : false;
				sap.app.checkoutController.setNextStepEnabled(bEnabled, "checkout-step-3");
			}, this ]
		});

		sap.app.CustomerTypeRadio = oRadioButtons;
		oMatrix.createRow( oLabelEmail);
		oMatrix.createRow( oFieldEmail);
		oMatrix.createRow( oRadioButtons);


		// we check the input for all required fields for controlling the enablement of the proceed button and the step
		// of the roadmap control

		this.attachBrowserEvent("keyup", sap.app.validator.checkRequiredFields);

		this.bindContext("/customer");
		return oMatrix;
	},

	/**
	 * addAddressFields: event handler when radiobutton for new customer is selected
	 */
	addAddressFields: function(){

		if (!this.addressFields){
			this.createAddressFields();
		}
		var oMatrix = sap.ui.getCore().byId("address");
		oMatrix.addRow(this.addressFields);
	},

	/**
	 * removeAddressFields: event handler when radiobutton for existing customer is selected
	 */
	removeAddressFields: function(){
		var oMatrix = sap.ui.getCore().byId("address");
		oMatrix.removeRow("address-fields");
	},

	/**
	 * createAddressFields: creates fields for input of address data
	 */
	createAddressFields: function(){

		var oColumn1Layout = new sap.ui.commons.layout.VerticalLayout({
			id: "columns-left",
			width: "300px"
		});
		var oColumn2Layout = new sap.ui.commons.layout.VerticalLayout({
			id: "columns-right",
			width: "300px"
		});

		var oFieldFirstName = new sap.ui.commons.TextField({
			id: "addr-firstname",
			value: "{FirstName}",
			width: "200px",
			required: true
		});
		var oLabelFirstName = new sap.ui.commons.Label({
			labelFor: oFieldFirstName,
			text: "{i18n>LBL_FIRST_NAME}"
		});

		var oFieldLastName = new sap.ui.commons.TextField({
			id: "addr-lastname",
			value: "{LastName}",
			width: "200px",
			required: true
		});
		var oLabelLastName = new sap.ui.commons.Label({
			labelFor: oFieldLastName,
			text: "{i18n>LBL_LAST_NAME}"
		});

		var oFieldDateOfBirth = new sap.ui.commons.DatePicker({
			// yyyymmdd:"19600101",
			// value: "{DateOfBirth}",
			id: "addr-dob",
			value: {
				path: "DateOfBirth",
				type: new sap.ui.model.type.Date()
			},
			width: "200px",
			required: true	
		});
		var oLabelDateOfBirth = new sap.ui.commons.Label({
			labelFor: oFieldDateOfBirth,
			text: "{i18n>LBL_DATE_OF_BIRTH}"
		});

		var oFieldAddressStreet = new sap.ui.commons.TextField({
			id: "addr-street",
			value: "{Street}",
			width: "200px",
			required: true
		});
		var oLabelAddressStreet = new sap.ui.commons.Label({
			labelFor: oFieldAddressStreet,
			text: "{i18n>LBL_ADDRESS_STREET}"
		});

		var oFieldAddressCity = new sap.ui.commons.TextField({
			id: "addr-city",
			value: "{City}",
			width: "200px",
			required: true
		});
		var oLabelAddressCity = new sap.ui.commons.Label({
			labelFor: oFieldAddressCity,
			text: "{i18n>LBL_ADDRESS_CITY}"
		});

		var oFieldAddressZip = new sap.ui.commons.TextField({
			id: "addr-zipcode",
			value: "{PostalCode}",
			width: "200px",
			required: true
		});
		var oLabelAddressZip = new sap.ui.commons.Label({
			labelFor: oFieldAddressZip,
			text: "{i18n>LBL_ADDRESS_ZIP}"
		});


		var oCountries = new sap.ui.commons.DropdownBox({
			id : "countries-ddlb",
			selectedKey: "{Country}",
			required : true,
			width : "200px",
			maxPopupItems : 10,
			maxHistoryItems : 0,
//			change : [ function(oEvent) {
//				var control = oEvent.getSource();
//			}, this ],
//			liveChange : [ function(oEvent) {
//				var control = oEvent.getSource();
//			}, this ],
		});

		var oLabelAddressCountry = new sap.ui.commons.Label({
			labelFor: oCountries,
			text: "{i18n>LBL_ADDRESS_COUNTRY}"
		});

		oColumn1Layout.addContent(oLabelFirstName);
		oColumn1Layout.addContent(oFieldFirstName);
		oColumn1Layout.addContent(oLabelLastName);
		oColumn1Layout.addContent(oFieldLastName);
		oColumn1Layout.addContent(oLabelDateOfBirth);
		oColumn1Layout.addContent(oFieldDateOfBirth);

		oColumn2Layout.addContent(oLabelAddressStreet);
		oColumn2Layout.addContent(oFieldAddressStreet);
		oColumn2Layout.addContent(oLabelAddressCity);
		oColumn2Layout.addContent(oFieldAddressCity);
		oColumn2Layout.addContent(oLabelAddressZip);
		oColumn2Layout.addContent(oFieldAddressZip);
		oColumn2Layout.addContent(oLabelAddressCountry);
		//oColumn2Layout.addContent(oFieldAddressCountry);
		oColumn2Layout.addContent(oCountries);

		var oCell = new sap.ui.commons.layout.MatrixLayoutCell(	{ vAlign : sap.ui.commons.layout.VAlign.Top	});
		oCell.addContent(oColumn1Layout);
		oCell.addContent(oColumn2Layout);

		var oRow = new sap.ui.commons.layout.MatrixLayoutRow({ id: "address-fields"});

		oRow.addCell( oCell );
		this.addressFields = oRow;

		// mapLanguageCountryNames must be called, after control is created
		this.getController().mapLanguageCountryNames();

	},

});
