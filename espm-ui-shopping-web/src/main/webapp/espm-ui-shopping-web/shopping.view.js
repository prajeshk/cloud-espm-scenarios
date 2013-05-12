sap.ui.jsview("espm-ui-shopping-web.shopping", {

	getControllerName : function() {
	return "espm-ui-shopping-web.shopping";
	},

	createContent : function(oController) {
		// Shopping content contains two areas: search area and result area.
		// Result area contains product categories per default and will be replaced with product list
		// if product category is selected or search is triggered.
		var oShoppingLayout = new sap.ui.commons.layout.MatrixLayout({
			id: "shopping-layout",
			width: "100%"
			});

		var oShoppingLayoutCellSearch = new sap.ui.commons.layout.MatrixLayoutCell({
			id: "shopping-layout-search"
		});

		var oShoppingLayoutCellContent = new sap.ui.commons.layout.MatrixLayoutCell({
			id: "shopping-layout-content"
		});

		oShoppingLayout.createRow(oShoppingLayoutCellSearch);
		oShoppingLayout.createRow(oShoppingLayoutCellContent);

		oShoppingLayoutCellSearch.addContent(sap.app.mainController.getCachedView("search"));

		oShoppingLayoutCellContent.addContent(sap.app.mainController.getCachedView("categories"));

		return oShoppingLayout;
	}

});
