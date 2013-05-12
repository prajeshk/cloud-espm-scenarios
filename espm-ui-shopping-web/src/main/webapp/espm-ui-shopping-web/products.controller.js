sap.ui.controller("espm-ui-shopping-web.products", {

	onBeforeRendering: function() {
		var aFilter = sap.app.product.searchFilter;
		// get RowRepaeter
		var oRowRepeater = sap.ui.getCore().byId("product-rr");
		// set binding for rows to make filtering working
		oRowRepeater.bindRows("/Products",
			this.oView.getProductTemplate(),
			sap.app.product.nameSorter,
			aFilter);

		// get control for product sorter and set it again to the view,
		// register view as listener for event and set initial entry to combo box of sorter
		sap.app.utility.restoreSorterControl(this.getView());
	},

	/**
	 * setProductsCount: to update the title with products count
	 */
	setProductsCount: function() {
		// get RowRepaeter
		var oRowRepeater = sap.ui.getCore().byId("product-rr");
		// get the count
		var iProductCount = oRowRepeater._getRowCount();
		// set the title of the product list to the number of found products if filter is set
		if (iProductCount == 0) {
			sap.ui.getCore().byId("products-list-title").setText(sap.app.i18n.getProperty("PRODUCT_LIST_TITLE_NOT_FOUND") );
			// .getTitle().setText(sap.app.i18n.getProperty("PRODUCT_LIST_TITLE_NOT_FOUND") );
			oRowRepeater.setNoData( new sap.ui.commons.TextView({text: ""}) );
		} else {
			sap.ui.getCore().byId("products-list-title").setText( sap.app.formatter.pluralize(iProductCount,
				sap.app.i18n.getProperty("PRODUCT_LIST_TITLE_SINGULAR"),
				sap.app.i18n.getProperty("PRODUCT_LIST_TITLE_PLURAL") )
			);
		}
	},
	
	/**
	 * toDetail: navigation to detail view of the selected product
	 * @param oEvent
	 */
	toDetail: function(oEvent) {
		var oContext = oEvent.getSource().getBindingContext();
		sap.app.mainController.getCachedView("productDetail");
		var oDetailThingInspector = sap.ui.getCore().byId("detail-layout-content");

		oDetailThingInspector.setModel(oEvent.getSource().getModel());
		oDetailThingInspector.setBindingContext(oContext);
		if (!oDetailThingInspector.isOpen()) {
			oDetailThingInspector.open();
		}
	},

	/**
	 * toCategories: navigation from product list to product categories view
	 */
	toCategories: function() {
		var oShoppingLayoutCellContent = sap.ui.getCore().byId("shopping-layout-content");
		oShoppingLayoutCellContent.removeAllContent();
		oShoppingLayoutCellContent.addContent(sap.app.mainController.getCachedView("categories"));
		sap.app.messages.removeAllMessages();
	}

});
