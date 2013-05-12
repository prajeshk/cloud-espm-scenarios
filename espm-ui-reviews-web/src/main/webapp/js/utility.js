jQuery.sap.declare("sap.app.utility");

/*
 * Use window.localStorage to store user preferences per browser. The userf can define preferences (like backend type,
 * OData service URL, etc) in the settings dialog.
 */
sap.app.localStorage = {
	PREF_USE_ABAP_BACKEND : "preferences.useAbapBackend",
	PREF_DISPLAY_DATA_SOURCE_INFO : "preferences.displayDataSourceInfo",

	getDefaultPreference : function(sKey) {
		switch (sKey) {
		case sap.app.localStorage.PREF_USE_ABAP_BACKEND:
			return sap.app.config.useAbapBackend;
		case sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO:
			return sap.app.config.displayDataSourceInfo;
		default:
			throw "Invalid preference key " + sKey;
		}
	},

	storePreference : function(sKey, value) {
		if (window.localStorage) {
			localStorage.setItem(sKey, value);
			return value;
		} else {
			return null;
		}
	},
	/*
	 * Returns window.localStorage value for item sKey. If window.localStorage does not exists or no value for sKey is
	 * stored then default preference value is returned.
	 */
	getPreference : function(sKey) {
		if (window.localStorage) {
			var storedValue = localStorage.getItem(sKey);
			if (storedValue) {
				if (sKey == sap.app.localStorage.PREF_USE_ABAP_BACKEND) {
					return (storedValue === 'true');
				} else if (sKey == sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO) {
					return (storedValue === 'true');
				} else {
					return (storedValue);
				}
			}
		}
		return (sap.app.localStorage.getDefaultPreference(sKey));
	},

	removeStoredPreference : function(sKey) {
		if (window.localStorage) {
			localStorage.removeItem(sKey);
		}
	},

},

sap.app.utility = {
	getBackendDestination : function() {
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			return ("abapbackend");
		} else {
			return ("cloudbackend");
		}
	},

	getExtensionBackendDestination : function() {
		return ("cloudextensionbackend");
	},

	getBackendTypeText : function() {
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			return (sap.app.i18n.getProperty("DATA_SOURCE_INFO_ABAP_BACKEND"));
		}else{
			return (sap.app.i18n.getProperty("DATA_SOURCE_INFO_HANA_CLOUD"));
		}
	},

	getDataSourceInfoOdataServiceUrl : function() {
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			return (sap.app.config.abapOdataServiceUrlWithLogin);
		}else{
			return (sap.app.config.cloudOdataServiceUrl);
		}
	},

};

sap.app.readOdata = {

	readCategoriesSuccess : function(oData, response) {
		// prepare main- and child-categories by setting up a tree structure for the categories
		var oCategories = {};
		var aCategories = [];

		for ( var i = 0; i < oData.results.length; i++) {
			var oCurrentCategory = oData.results[i];
			// create main category if not existent
			if (!oCategories[oCurrentCategory.MainCategory]) {
				oCategories[oCurrentCategory.MainCategory] = {
					name : oCurrentCategory.MainCategoryName,
					category : oCurrentCategory.MainCategory,
					categories : []
				};
			}
			// add child category
			oCategories[oCurrentCategory.MainCategory].categories.push({
				name : oCurrentCategory.CategoryName,
				category : oCurrentCategory.Category,
				numberOfProducts : oCurrentCategory.NumberOfProducts
			});
		}
		for ( var key in oCategories) {
			aCategories.push(oCategories[key]);
		}

		// create new model for categories
		var oCategoryChooserModel = new sap.ui.model.json.JSONModel();
		// create new entry for all categories
		var oNewCategoryEntry = {};
		oNewCategoryEntry["Category"] = sap.app.i18n.getProperty("ALL_CATEGORIES_LIST_ENTRY");
		// add new entry to model
		oData.results.sort(compareCategory);
		oData.results.unshift(oNewCategoryEntry);

		oCategoryChooserModel.setData({
			AvailableCategories : oData.results
		});

		sap.app.mainController.getCachedView("item2").setModel(oCategoryChooserModel);
		sap.ui.getCore().byId("item2-dropdown-box-id").setSelectedKey(
				sap.app.i18n.getProperty("ALL_CATEGORIES_LIST_ENTRY"));

		function compareCategory(a, b) {
			if (a.Category < b.Category) {
				return -1;
			}
			if (a.Category > b.Category) {
				return 1;
			}
			return 0;
		}
		;
	},

	readError : function(oError) {
		var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_ODATA_READ") + ": " + oError.message;
		sap.ui.commons.MessageBox.alert(sMessageText);
	},

	readSuccess : function() {
		sap.ui.commons.MessageBox.alert("Success message.");
	}

};
