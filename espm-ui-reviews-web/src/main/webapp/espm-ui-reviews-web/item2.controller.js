sap.ui.controller("espm-ui-reviews-web.item2", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created. Can be used to
	 * modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit : function() {
		// create JSON Model which contains product categories from OData model with additional
		// entry for 'All Categories'. The value in the model are set in app.js after reading
		// ProductCategories collection of OData
		var oCategoriesJSONModel = new sap.ui.model.json.JSONModel();
		this.getView().setModel(oCategoriesJSONModel);
	},

});