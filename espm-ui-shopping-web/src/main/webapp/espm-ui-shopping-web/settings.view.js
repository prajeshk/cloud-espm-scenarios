sap.ui.jsview("espm-ui-shopping-web.settings", {

	getControllerName : function() {
		return "espm-ui-shopping-web.settings";
	},

	createContent : function(oController) {

		var oSettingsLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			width : "100%",
			columns : 2
		});

		// choose backend type: header
		oSettingsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan : 2,
			content : [ new sap.ui.commons.TextView({
				text : "{i18n>SETTINGS_BACKEND_TYPE_HEADER_TEXT}",
			}) ]
		}));

		// backend type 1: radio button ('HANA Cloud')
		oSettingsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.RadioButton({
				id : "settings-cloud-backend-rb1-id",
				groupName : 'backend-types',
				selected : !oController.getPreferenceUseAbapBackend(),
				text : ""
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Left,
			content : [ new sap.ui.commons.TextView({
				text : "{i18n>SETTINGS_BACKEND_TYPE_RB1_TEXT}"
			}) ]
		}));

		// abap backend details
		oSettingsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.TextView({
				text : ""
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ this.getCloudBackendDetailsLayout() ]
		}));

		// backend type 2: radio button ('ABAP Backend')
		oSettingsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.RadioButton({
				id : "settings-abap-backend-rb2-id",
				groupName : 'backend-types',
				selected : oController.getPreferenceUseAbapBackend(),
				text : ""
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Left,
			content : [ new sap.ui.commons.TextView({
				text : "{i18n>SETTINGS_BACKEND_TYPE_RB2_TEXT}"
			}) ]
		}));

		// abap backend details
		oSettingsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.TextView({
				text : ""
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ this.getAbabBackendDetailsLayout() ]
		}));

		// display data source info
		oSettingsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan : 2,
			content : [ new sap.ui.commons.Label({
				text : "{i18n>DISPLAY_DATA_SOURCE_INFO_LABEL}"
			}).addStyleClass("textViewMarginsLeftRight"), new sap.ui.commons.CheckBox({
				id : "cloud-odata-display-data-source-info-chkbox-id",
				checked : sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO)
			}) ]
		}));

		// merge customer reviews tab
		oSettingsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan : 2,
			content : [ new sap.ui.commons.Label({
				text : "{i18n>MERGE_CUSTOMER_REVIEWS_TAB_LABEL}"
			}).addStyleClass("textViewMarginsLeftRight"), new sap.ui.commons.CheckBox({
				id : "display-customer-reviews-chkbox-id",
				checked : sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_CUSTOMER_REVIEWS)
			}) ]
		}));

		return (oSettingsLayout);
	},

	getCloudBackendDetailsLayout : function() {

		// cloud backend details layout
		var oCloudBackendDetailsLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			width : "100%",
			columns : 2
		});
		// cloud odata service url
		oCloudBackendDetailsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.Label({
				text : "{i18n>SETTINGS_ODATA_SERVICE_URL_LABEL}"
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.TextField({
				value : sap.app.config.cloudOdataServiceUrl,
				width : "500px",
				enabled : false
			}) ]
		}));
		// cloud test url link
		oCloudBackendDetailsLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.TextView({
				text : ""
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.Link({
				text : "{i18n>SETTINGS_TEST_URL_LINK_TEXT}",
				href : sap.app.config.cloudOdataServiceUrl,
				target : "_blank"
			}) ]
		}));

		return (oCloudBackendDetailsLayout);
	},

	getAbabBackendDetailsLayout : function() {

		// abap backend details layout
		var oAbapBackendTypeMatrixLayout = new sap.ui.commons.layout.MatrixLayout({
			visible : true,
			layoutFixed : false,
			width : "100%",
			columns : 2
		});

		// abap odata service url
		oAbapBackendTypeMatrixLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.Label({
				text : "{i18n>SETTINGS_ODATA_SERVICE_URL_LABEL}"
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.TextField({
				value : sap.app.config.displayAbapOdataServiceUrl,
				width : "500px",
				enabled : false
			}) ]
		}));

		// abap public test user
		oAbapBackendTypeMatrixLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.Label({
				text : "{i18n>SETTINGS_PUBLIC_USER_LABEL}"
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.TextField({
				value : sap.app.config.displayAbapUser,
				width : "500px",
				enabled : false
			}) ]
		}));

		// abap public test password
		oAbapBackendTypeMatrixLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.Label({
				text : "{i18n>SETTINGS_PUBLIC_PASSWORD_LABEL}"
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.TextField({
				value : sap.app.config.displayAbapPassword,
				width : "500px",
				enabled : false
			}) ]
		}));

		var testLinkForABAP = '';
		if (navigator.appName
				&& navigator.appName === 'Microsoft Internet Explorer') {
			testLinkForABAP = sap.app.config.displayAbapOdataServiceUrl;
		} else {
			testLinkForABAP = sap.app.config.abapOdataServiceUrlWithLogin;
		}

		// abap test url link
		oAbapBackendTypeMatrixLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ new sap.ui.commons.Label({
				text : ""
			}) ]
		}), new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Right,
			content : [ new sap.ui.commons.Link({
				text : "{i18n>SETTINGS_TEST_URL_LINK_TEXT}",
				href : testLinkForABAP,
				target : "_blank"
			}) ]
		}));

		return (oAbapBackendTypeMatrixLayout);
	}

});
