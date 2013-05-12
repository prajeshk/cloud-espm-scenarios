sap.ui.controller("espm-ui-shopping-web.settings", {

	onInit : function() {
	},

	okButtonClicked : function() {
		// use abap backend
		var oCloudRadioButton = sap.ui.getCore().byId("settings-cloud-backend-rb1-id");
		// store
		sap.app.localStorage.storePreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND, !oCloudRadioButton
				.getSelected());

		// display data source info
		var oDisplayDataSourceInfoChkBox = sap.ui.getCore().byId("cloud-odata-display-data-source-info-chkbox-id");
		sap.app.localStorage.storePreference(sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO, oDisplayDataSourceInfoChkBox
				.getChecked());

		// display customer reviews
		var oDisplayCustomerReviewsChkBox = sap.ui.getCore().byId("display-customer-reviews-chkbox-id");
		sap.app.localStorage.storePreference(sap.app.localStorage.PREF_DISPLAY_CUSTOMER_REVIEWS, oDisplayCustomerReviewsChkBox
				.getChecked());

		sap.ui.commons.MessageBox.alert(sap.app.i18n.getProperty("SETTINGS_STORED_SUCCESS_MSG"),
			// callback to refresh the page automatically
			function() {
				window.location.reload();
			}
		);

		// close settings dialog
		sap.ui.getCore().byId("settings-dialog-id").close();
	},

	cancelButtonClicked : function() {
		// close settings dialog
		sap.ui.getCore().byId("settings-dialog-id").close();
	},

	initializeSettingsDialog : function() {
		var oController = sap.app.mainController.getCachedView("settings").getController();

		// use abap backend
		var oCloudRadioButton = sap.ui.getCore().byId("settings-cloud-backend-rb1-id");
		oCloudRadioButton.setSelected(!oController.getPreferenceUseAbapBackend());

		var oAbapRadioButton = sap.ui.getCore().byId("settings-abap-backend-rb2-id");
		oAbapRadioButton.setSelected(oController.getPreferenceUseAbapBackend());

		// display data source info
		var oDisplayDataSourceInfoChkBox = sap.ui.getCore().byId("cloud-odata-display-data-source-info-chkbox-id");
		oDisplayDataSourceInfoChkBox.setChecked(sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO));

		// display customer reviews
		var oDisplayCustomerReviewsChkBox = sap.ui.getCore().byId("display-customer-reviews-chkbox-id");
		oDisplayCustomerReviewsChkBox.setChecked(sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_CUSTOMER_REVIEWS));
	},

	getPreferenceUseAbapBackend : function() {
		return (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND));
	}

});