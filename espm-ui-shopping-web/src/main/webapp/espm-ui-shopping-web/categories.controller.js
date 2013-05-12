sap.ui.controller("espm-ui-shopping-web.categories", {

	onInit: function () {
		// create JSON Model which contains product categories from OData as a tree structure.
		// The value in the model are set in app.js after reading ProductCategories collection of OData
		var oCategoriesJSONModel = new sap.ui.model.json.JSONModel();
		this.getView().setModel(oCategoriesJSONModel);
	},
	/**	toProducts
	 *
	 * 	Get selected category set filter to product model and navigate to product list.
	 * 	Navigation is a replacement of content, product categories list is replaced with
	 * 	filtered product list in a cell of shopping view
	 */
	toProducts: function(oEvent) {
		// get selected category
		var sCategory = oEvent.getParameter("category");
		if (sCategory) {
			// create a model filter and set to a model
			sap.app.product.searchFilter = [new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, sCategory)];
		}
		// get from shopping view a cell with result content which contains categories
		var oShoppingLayoutCellContent = sap.ui.getCore().byId("shopping-layout-content");
		// replace content of cell with product result list
		oShoppingLayoutCellContent.removeAllContent();
		oShoppingLayoutCellContent.addContent(sap.app.mainController.getCachedView("products"));
	}
});
