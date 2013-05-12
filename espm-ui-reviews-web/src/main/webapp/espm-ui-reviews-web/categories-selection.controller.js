sap.ui.controller("espm-ui-reviews-web.categories-selection", {

	onInit : function() {
		// create JSON Model which contains product categories from OData model with additional
		// entry for 'All Categories'. The value in the model are set in app.js after reading
		// ProductCategories collection of OData
		var oCategoriesJSONModel = new sap.ui.model.json.JSONModel();

		this.getView().setModel(oCategoriesJSONModel);
	},

	selectedCategoryChanged : function(selectedKey) {
		var oEventBus = sap.ui.getCore().getEventBus();
		oEventBus.publish("sap.app", "selectedCategoryChanged", selectedKey);
	},
});
