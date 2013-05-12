jQuery.sap.declare("sap.app.utility");

/*
 * Use window.localStorage to store user preferences per browser. The user can define preferences (as backend type) in
 * the settings dialog.
 */
sap.app.localStorage = {

	PREF_USE_ABAP_BACKEND : "preferences.useAbapBackend",
	PREF_DISPLAY_WELCOME_DIALOG : "preferences.displayWelcomeDialog",

	getDefaultPreference : function(sKey) {
		switch (sKey) {
		case sap.app.localStorage.PREF_USE_ABAP_BACKEND:
			return sap.app.config.useAbapBackend;
		case sap.app.localStorage.PREF_DISPLAY_WELCOME_DIALOG:
			return sap.app.config.displayWelcomeDialog;
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
sap.app.readOdata = {

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
	}
};

