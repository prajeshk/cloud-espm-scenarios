sap.ui.jsview("espm-ui-shopping-web.search", {

	getControllerName : function() {
		return "espm-ui-shopping-web.search";
	},

	createContent : function(oController) {
		// create a search field
		var oSearchField = new sap.ui.commons.SearchField({
			id: "search-field",
			enableClear: false,
			showListExpander: false,
			enableListSuggest: false,
			enableFilterMode: true,
			width: "46%",
			search: oController.doSearch
		});

		// create layout and set search field and categories
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed: true,
			width: "100%",
			widths : [ "70%", "30%" ]
		});

		oLayout.createRow(oSearchField);

		return oLayout;
	}
});
