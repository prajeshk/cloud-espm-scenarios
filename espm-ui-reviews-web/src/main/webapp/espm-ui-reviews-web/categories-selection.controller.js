sap.ui.controller("espm-ui-reviews-web.categories-selection", {

	onInit : function() {
		// create JSON Model which contains product categories from OData model with additional
		// entry for 'All Categories'. The value in the model are set in app.js after reading
		// ProductCategories collection of OData
		var oCategoriesJSONModel = new sap.ui.model.json.JSONModel();

		// A selected product of the product dropdown box contents can be changed implicitly (i.e. without direct user 
		// interaction on the product dropdown box) if a new category is selected via user interaction. 
		// In case of such an implicitly changed product selection 'selectedProductImplicitlyChanged' is true. When the
		// OData request which retrieves the new product list for a selected category is completed then a 'true' value 
		// of 'selectedProductImplicitlyChanged' triggers a 'selectedProductIdChanged' event 
		// (see sap.app.readOdata.requestCompleted in utility.js)
		// The category change event of the category-selection dropdown box sets the value to true and after the 
		// corresponding OData request which retrieves the new product list for a selected category has fired the 
		// 'selectedProductIdChanged' event the value is set to false.
		oCategoriesJSONModel.setProperty("selectedProductImplicitlyChanged", true );

		this.getView().setModel(oCategoriesJSONModel);
	},

	selectedCategoryChanged : function(selectedKey) {
		sap.app.readOdata.setSelectedProductImplicitlyChanged(true);
		sap.app.uivisibility.showLoadingCustomerReviewsPanel();

		var oEventBus = sap.ui.getCore().getEventBus();
		oEventBus.publish("sap.app", "selectedCategoryChanged", selectedKey);
	},

	// This method returns 'selectedProductImplicitlyChanged' of the view JSONModel
	getSelectedProductImplicitlyChanged: function(bValue) {
		return this.getView().getModel().getProperty("selectedProductImplicitlyChanged");
	},

	// This method sets 'selectedProductImplicitlyChanged' according to the passed value
	setSelectedProductImplicitlyChanged: function(bValue) {
		this.getView().getModel().setProperty("selectedProductImplicitlyChanged", bValue );		
	},

});
