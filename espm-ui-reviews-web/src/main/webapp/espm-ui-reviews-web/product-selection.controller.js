sap.ui.controller("espm-ui-reviews-web.product-selection", {

	onInit : function() {
		var that = this;

		var oEventBus = sap.ui.getCore().getEventBus();
		oEventBus.subscribe("sap.app", "selectedCategoryChanged", function(channelId, eventId, selectedCategory) {
			that.getProductDropDownBoxContents(selectedCategory);
		});

		var aFilter = [];

		var oProductsDropdownBox = sap.ui.getCore().byId("product-selection-dropdown-box-id");

		// set binding for items to make filtering working
		oProductsDropdownBox.bindItems("/Products", this.oView.getProductsListItemTemplate(), new sap.ui.model.Sorter(
				"Name", false), aFilter);
	},

	getProductDropDownBoxContents : function(selectedCategory) {
		var aFilter = [];

		if (selectedCategory !== sap.app.i18n.getProperty("ALL_CATEGORIES_LIST_ENTRY")) {
			var categoryFilter = new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, selectedCategory);
			aFilter.push(categoryFilter);
		}
		// get dropdown box
		var oProductsDropdownBox = sap.ui.getCore().byId("product-selection-dropdown-box-id");

		// set binding for items to make filtering working
		oProductsDropdownBox.bindItems("/Products", this.oView.getProductsListItemTemplate(), new sap.ui.model.Sorter(
				"Name", false), aFilter);
	},

	selectedProductChanged : function(oEvent) {

		// set binding context for product details controls
		var selectedItemId = oEvent.oSource.getSelectedItemId();
		var bindingCtx = sap.ui.getCore().byId(selectedItemId).getBindingContext();
		this.getView().getController().setProductDetailsBindingContext(bindingCtx);
	},

	setProductDetailsBindingContext : function(bindingCtx) {
		sap.ui.getCore().byId("selected-product-image-id").setBindingContext(bindingCtx);
		sap.ui.getCore().byId("selected-product-name-view-id").setBindingContext(bindingCtx);
		sap.ui.getCore().byId("selected-product-desc-view-id").setBindingContext(bindingCtx);
	}

});
