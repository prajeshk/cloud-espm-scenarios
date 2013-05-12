jQuery.sap.declare("sap.app.utility");

/*
 * Use window.localStorage to store user preferences per browser. The user can define preferences (as backend type) in
 * the settings dialog.
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

	getBackendImagesDestination : function() {
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			return ("abapbackendimages");
		} else {
			return ("cloudbackendimages");
		}
	},

	getImagesBaseUrl : function() {
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			return (sap.app.config.abapImagesBaseUrl);
		} else {
			return (sap.app.config.cloudImagesBaseUrl);
		}
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

sap.app.uivisibility = {
	// product selection panel
	showProductSelectionPanel : function() {
		sap.app.mainController.getCachedView("reviews").getController().showProductSelectionPanel();
	},
	setUiControlIsVisible : function(id, isVisible) {
		var uiControl = sap.ui.getCore().byId(id);
		if (uiControl !== null) {
			uiControl.setVisible(isVisible);
		}
	},

	// customer reviews panel (filled)
	showFilledCustomerReviewsPanel : function() {
		sap.app.mainController.getCachedView("reviews").getController().showFilledCustomerReviewsPanel();
	},
	// customer reviews panel (empty)
	showEmptyCustomerReviewsPanel : function() {
		sap.app.mainController.getCachedView("reviews").getController().showEmptyCustomerReviewsPanel();
	},
	// customer reviews panel (loading)
	showLoadingCustomerReviewsPanel : function() {
		sap.app.mainController.getCachedView("reviews").getController().showLoadingCustomerReviewsPanel();
	},
	// row repeater
	showRowRepeater : function() {
		sap.app.mainController.getCachedView("customer-reviews").getController().showRowRepeater();
	},
	hideRowRepeater : function() {
		sap.app.mainController.getCachedView("customer-reviews").getController().hideRowRepeater();
	},
	// row repeater header
	showRowRepeaterHeaderLayout : function() {
		sap.app.mainController.getCachedView("customer-reviews").getController().showRowRepeaterHeaderLayout();
	},
	hideRowRepeaterHeaderLayout : function() {
		sap.app.mainController.getCachedView("customer-reviews").getController().hideRowRepeaterHeaderLayout();
	},
	// row repeater footer
	showRowRepeaterFooterLayout : function() {
		sap.app.mainController.getCachedView("customer-reviews").getController().showRowRepeaterFooterLayout();
	},
	hideRowRepeaterFooterLayout : function() {
		sap.app.mainController.getCachedView("customer-reviews").getController().hideRowRepeaterFooterLayout();
	}
};

sap.app.readExtensionOData = {

	requestCompleted : function(oEvent) {

		var oExtensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");
		var oReviews = oExtensionODataModel.getProperty("/");
		var sSelectedProductId = sap.app.mainController.getCachedView("customer-reviews").getModel().getData()["selectedProductId"];
		var oRatingInfo = sap.app.readExtensionOData.getRatingInfo(oReviews, sSelectedProductId);

		// customer reviews exists
		if (oRatingInfo.iReviewsCount > 0) {
			// set average rating value
			sap.app.mainController.getCachedView("customer-reviews").getController().setRatingIndicatorValue(
					oRatingInfo.fAverageRating);

			// show filled customer reviews panel
			sap.app.uivisibility.showFilledCustomerReviewsPanel();
		} else {
			// show empty customer reviews panel
			sap.app.uivisibility.showEmptyCustomerReviewsPanel();
		}
	},

	getRatingInfo : function(oReviews, sSelectedProductId) {
		var iReviewsCount = 0;
		var fRatingsSum = 0.0;
		var fAverageRating = 0.0;

		for (var sReviewId in oReviews) {
			var oReview = oReviews[sReviewId];
			if (sSelectedProductId === oReview.ProductId) {
				iReviewsCount++;
				fRatingsSum += parseFloat(oReview.Rating);
			}
		}

		if (iReviewsCount > 0) {
			fAverageRating = fRatingsSum / iReviewsCount;
		}
		return {
			iReviewsCount : iReviewsCount,
			fAverageRating : fAverageRating
		};
	}
};

sap.app.readOdata = {

	requestCompleted : function(oEvent) {
		var oProductsDropdownBox = sap.ui.getCore().byId("product-selection-dropdown-box-id");

		if (oProductsDropdownBox != null && oProductsDropdownBox.getSelectedKey() != "") {
			// set binding context on product details controls
			var selectedItemId = oProductsDropdownBox.getSelectedItemId();
			var bindingCtx = sap.ui.getCore().byId(selectedItemId).getBindingContext();
			sap.app.mainController.getCachedView("product-selection").getController().setProductDetailsBindingContext(
					bindingCtx);

			// If selected product changed implicitly by changing of category then 'selectedProductIdChanged' event has
			// to be fired.
			if (sap.app.readOdata.getSelectedProductImplicitlyChanged) {
				sap.app.readOdata.setSelectedProductImplicitlyChanged(false);

				var oEventBus = sap.ui.getCore().getEventBus();
				oEventBus.publish("sap.app", "selectedProductIdChanged", oProductsDropdownBox.getSelectedKey());

				sap.app.uivisibility.showLoadingCustomerReviewsPanel();
			}
		}
	},

	getSelectedProductImplicitlyChanged : function() {
		sap.app.mainController.getCachedView("categories-selection").getController()
				.getSelectedProductImplicitlyChanged();
	},

	setSelectedProductImplicitlyChanged : function(bValue) {
		sap.app.mainController.getCachedView("categories-selection").getController()
				.setSelectedProductImplicitlyChanged(bValue);
	},

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
		oCategoryChooserModel.setProperty("selectedProductImplicitlyChanged", true);

		sap.app.mainController.getCachedView("categories-selection").setModel(oCategoryChooserModel);
		sap.ui.getCore().byId("categories-selection-dropdown-box-id").setSelectedKey(
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

	createCustomerReviewSuccess: function (oError) {
		sap.ui.commons.MessageBox.alert( sap.app.i18n.getProperty("CUSTOMER_REVIEW_SUCCESS_MSG") );
	}

};
