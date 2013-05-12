sap.ui.controller("espm-ui-shopping-web.search", {

	onAfterRendering: function() {
		// preset text 'Search' as an initial placeholder in a search field
		jQuery("#search-field-tf-input").attr("placeholder", sap.app.i18n.getProperty("SEARCH_FIELD_PLACEHOLDER"));
	},

	/**
	 * doSearch triggers a search depending on values in the search field
	 * 
	 * @param oEvent
	 */
	doSearch: function(oEvent) {
		sap.app.product.searchFilter = [];
		// get value from the search field
		var sSearchQuery = sap.ui.getCore().byId("search-field").getValue();
		// create a model filter depending on search value and set this to product model
		if (sSearchQuery) {
			if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
				sap.app.product.searchFilter.push(new sap.ui.model.odata.Filter("Name",
					[{operator:sap.ui.model.FilterOperator.Contains,value1:sSearchQuery.toLowerCase()}],false));
			} else {
				sap.app.product.searchFilter.push(new sap.ui.model.odata.Filter("tolower(Name)",
						[{operator:sap.ui.model.FilterOperator.Contains,value1:"'" + sSearchQuery.toLowerCase() + "'"}],false));
			}
		}

		// set product result list to result area
		var oShoppingLayoutCellContent = sap.ui.getCore().byId("shopping-layout-content");
		oShoppingLayoutCellContent.removeAllContent();
		oShoppingLayoutCellContent.addContent(sap.app.mainController.getCachedView("products"));
	}
});
