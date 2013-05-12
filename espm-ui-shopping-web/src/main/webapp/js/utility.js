jQuery.sap.declare("sap.app.utility");

/*
 * Use window.localStorage to store user preferences per browser. The user can define preferences (as backend type) in
 * the settings dialog.
 */
sap.app.localStorage = {

	PREF_USE_ABAP_BACKEND : "preferences.useAbapBackend",
	PREF_DISPLAY_WELCOME_DIALOG : "preferences.displayWelcomeDialog",
	PREF_DISPLAY_DATA_SOURCE_INFO : "preferences.displayDataSourceInfo",
	PREF_DISPLAY_CUSTOMER_REVIEWS : "preferences.mergeCustomerReviewsTab",

	getDefaultPreference : function(sKey) {
		switch (sKey) {
		case sap.app.localStorage.PREF_USE_ABAP_BACKEND:
			return sap.app.config.useAbapBackend;
		case sap.app.localStorage.PREF_DISPLAY_WELCOME_DIALOG:
			return sap.app.config.displayWelcomeDialog;
		case sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO:
			return sap.app.config.displayDataSourceInfo;
		case sap.app.localStorage.PREF_DISPLAY_CUSTOMER_REVIEWS:
			return sap.app.config.displayCustomerReview;
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
				} else if (sKey == sap.app.localStorage.PREF_DISPLAY_WELCOME_DIALOG) {
					return (storedValue === 'true');
				} else if (sKey == sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO) {
					return (storedValue === 'true');
				} else if (sKey == sap.app.localStorage.PREF_DISPLAY_CUSTOMER_REVIEWS) {
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

	iCounter : static = 0,

	getCounter : function() {
		return this.iCounter++;
	},

	getBackendDestination : function() {
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			return ("abapbackend");
		} else {
			return ("cloudbackend");
		}
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

	clearMessagesAfter: function(iMs) {
		window.setTimeout(function () {
			sap.app.messages.removeAllMessages();
		}, iMs);
	},

	/**
	 * getProductSorterControl: Sorter includes a label and dropdown listbox for sorting
	 * @returns label and combo box in a matrix layout
	 */
	getProductSorterControl: function (){
		// return control if already created
		if (!this.sorter){

			// create sorter control as matrix layout with label and combo box
			var oSortLabel = new sap.ui.commons.Label({
				id : "label-product-sorter",
				text : "{i18n>PRODUCT_LIST_SORT_BY}"
			}).addStyleClass("product-sorter-label");

			var oSortCB = new sap.ui.commons.ComboBox({
				id: "combobox-product-sorter",
				// create a empty line for initialization of ComboBox
				items:[
					new sap.ui.core.ListItem({
						id : "sort_initial_id",
						text :"",
						key : "sort_initial",
					}),
					new sap.ui.core.ListItem({
						id : "sort_asced_descr_id",
						text :"{i18n>PRODUCT_LIST_SORT_NAME_DESCENDING}",
						key : "sort_asced_descr",
						customData : [new sap.ui.core.CustomData({
							key : "path",
							value : "Name",
							}),
							new sap.ui.core.CustomData({
								key : "descending",
								value : true,
							}),
						]
					}),
					new sap.ui.core.ListItem({
						id : "sort_asced_price_id",
						text :"{i18n>PRODUCT_LIST_SORT_PRICE_ASCENDING}",
						key : "sort_asced_price",
						customData : [ new sap.ui.core.CustomData({
							key : "path",
							value : "Price",
						}),
						new sap.ui.core.CustomData({
							key : "descending",
							value : false,
						}),
						]
					}),
					new sap.ui.core.ListItem({
						id : "sort_desced_price_id",
						text :"{i18n>PRODUCT_LIST_SORT_PRICE_DESCENDING}",
						key : "sort_desced_price",
						customData : [ new sap.ui.core.CustomData({
							key : "path",
							value : "Price",
							}),
							new sap.ui.core.CustomData({
								key : "descending",
								value : true,
							}),
						]
					}),
				]
			});
			var oSorterContent = new sap.ui.commons.layout.HorizontalLayout({
				id : "product-sorter",
				content : [ oSortLabel, oSortCB ]
			});

			this.sorter = oSorterContent;

			/* attachChangeEvent - check if listener for combobox event 'change' are existing, then detach these listener
			 * and attach as listener the current view in which this control is used
			 */
			this.sorter.attachChangeEvent = function ( oListener ) {
				var oSortCB = sap.ui.getCore().byId("combobox-product-sorter");
				var i = 0;
				while (oSortCB.mEventRegistry.change ) {
					oSortCB.detachChange(sap.app.utility.onSortProducts, oSortCB.mEventRegistry.change[i].oListener);
					i++;
				}
				oSortCB.attachChange(oListener.getDataForSorting(), sap.app.utility.onSortProducts, oListener);
			} ;

		}

		return this.sorter;
	},

	restoreSorterControl: function (oParentView) {
		// get control for product sorter
		var oSorterControl = sap.app.utility.getProductSorterControl(oParentView);
		var oContentForSorter = oParentView.getParentContentOfSorter();
		this.restoreControlInContent(oContentForSorter, oSorterControl);
		// set initial value in combo box after restore, this item is empty
		var oSortCB = sap.ui.getCore().byId("combobox-product-sorter");
		oSortCB.setSelectedItemId("sort_initial_id");

		// set right event handler and style for parent view
		oSorterControl.attachChangeEvent(oParentView);

		return oSorterControl;
	},
	/**
	 * restoreControlInContent: set the control to the content if not exists already
	 * @param oContent: content in which the control should be set
	 * @param oControl: control to be set in content
	 */
	restoreControlInContent: function (oContent , oControl) {
		var indexOfSorter = oContent.indexOfContent(oControl);
		// the control is set to content only if not exists already
		if ( indexOfSorter < 0 ){
			oContent.addContent(oControl);
		}
	},
	/**
	 * onSortProducts: event handler for sorting in a product list
	 * @param oEvent
	 * @param oRowRepeater: data for sorting
	 */
	onSortProducts : function(oEvent, oRowRepeater){
		// get selected id from combo box
		var idSelected = oEvent.getSource().getSelectedItemId();
		// get element with id for selected id
		var oSelectedItem = sap.ui.getCore().byId(idSelected);
		// get custom data from element
		var oCustData = oSelectedItem.getCustomData();
		if (oCustData.length != 0) {
			// create model sorter with given parameters from combo box
			var sorter = new sap.ui.model.Sorter(
				oCustData[0].getValue(),
				oCustData[1].getValue()
			);
			oRowRepeater.getBinding("rows").sort(sorter);
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

	extensionRequestCompleted : function(oEvent) {

		// calculate average rating
		var extensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");
		var selectedProductId = sap.app.mainController.getCachedView("customer-reviews").getModel().getData()["selectedProductId"];
		var obj = extensionODataModel.getProperty("/");
		var customerReviewsCnt = 0;
		var ratingSum = 0.0;
		for ( var prop in obj) {
			if (selectedProductId === obj[prop].ProductId) {
				ratingSum += parseFloat(obj[prop].Rating);
				customerReviewsCnt++;
			}
		}

		// customer reviews exists
		if (customerReviewsCnt > 0) {
			// set average rating value
			sap.app.mainController.getCachedView("customer-reviews").getController().setRatingIndicatorValue(
					ratingSum / customerReviewsCnt);

			// show filled customer reviews panel
			sap.app.uivisibility.showFilledCustomerReviewsPanel();
		} else {
			// show empty customer reviews panel
			sap.app.uivisibility.showEmptyCustomerReviewsPanel();
		}
	},
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

	getCustomerByEmailAddress: function ( ){
		var that = this;

		this.successResponse = function(oData, response) {
			if (response.statusCode == 200 && response.data.CustomerId ) {
				that.result = true;
				sap.app.checkoutController.getView().getModel().setProperty("/customer",response.data);
				sap.app.customerCreated = false;
				sap.app.checkoutController.getView().getModel().setProperty("/payment/cardOwner",response.data.FirstName + " " + response.data.LastName);
			} else {
				that.result = false;
			}
		};
	},
	
	getCustomerByEmailAddressError: function (oError) {
		// if the requested e-mail does not exist an error (HTTP 400) is returned
	},

	readCategoriesSuccess: function(oData, response) {
		// prepare main- and child-categories by setting up a tree structure for the categories
		var oCategories = {};
		var aCategories = [];

		for (var i = 0; i < oData.results.length; i++) {
			var oCurrentCategory = oData.results[i];
			// create main category if not existent
			if (!oCategories[oCurrentCategory.MainCategory]) {
				oCategories[oCurrentCategory.MainCategory] = {
					name: oCurrentCategory.MainCategoryName,
					category: oCurrentCategory.MainCategory,
					categories: []
				};
			}
			// add child category
			oCategories[oCurrentCategory.MainCategory].categories.push({
				name: oCurrentCategory.CategoryName,
				category: oCurrentCategory.Category,
				numberOfProducts: oCurrentCategory.NumberOfProducts
			});
		}
		for (var key in oCategories) {
			aCategories.push(oCategories[key]);
		}

		var oCategoryModel = new sap.ui.model.json.JSONModel();
		oCategoryModel.setData( { mainCategories: aCategories } );
		// assign the category model to the categorie view
		sap.app.mainController.getCachedView("categories").setModel(oCategoryModel);

		// create new model for categories
		var oCategoryChooserModel = new sap.ui.model.json.JSONModel();
		//create new entry for all categories
		var oNewCategoryEntry = {};
		oNewCategoryEntry["Category"] = sap.app.i18n.getProperty("ALL_CATEGORIES_LIST_ENTRY");
		oData.results.sort(compareCategory);
		// add new entry to model
		oData.results.unshift(oNewCategoryEntry);
		oCategoryChooserModel.setData({AvailableCategories:oData.results});
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
	},

	createCustomer: function (oData, response) {
		if (response.statusCode == 201) {
			sap.app.checkoutController.getView().getModel().setProperty("/customer",response.data);
			sap.app.checkoutController.getView().getModel().setProperty("/payment/cardOwner",response.data.FirstName + " " + response.data.LastName);
			//sap.app.checkoutController.getView().getModel().setProperty("/customer/created",true);
			sap.app.customerCreatedId = response.data.CustomerId;
			sap.app.customerCreated = true;
		}
	},

	createCustomerError: function(oError){
		var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_ACCOUNT_CREATION_FAILED") + ": " + oError.message;
		sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , "customer_creation_failed");
		sap.app.utility.clearMessagesAfter(sap.app.config.messageDuration);
	},

	createOrder: function(oData, response){
		if (response.statusCode == 201) {
			sap.app.checkoutController.getView().getModel().setProperty("/order",response.data);
		}
	},

	createOrderError: function(oError){
		var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_ORDER_CREATION_FAILED") + ": " + oError.message;
		sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , "order_creation_failed");
		sap.app.utility.clearMessagesAfter(sap.app.config.messageDuration);
	},

	readError: function (oError) {
		var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_ODATA_READ") + ": " + oError.message;
		sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , "odata_read_failed");
		sap.app.utility.clearMessagesAfter(sap.app.config.messageDuration);
	},

	createCustomerReviewSuccess : function(oError) {
		sap.ui.commons.MessageBox.alert(sap.app.i18n.getProperty("CUSTOMER_REVIEW_SUCCESS_MSG"));
	}

};

