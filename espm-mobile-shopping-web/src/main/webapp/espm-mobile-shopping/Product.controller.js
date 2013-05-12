sap.ui.controller("espm-mobile-shopping.Product", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {

	},

	onBeforeShow : function(evt) {
		var view = this.getView();
		if ("to" === evt.direction) {
			this.getView().page.setTitle(evt.data.categoryName);		
			var id = evt.data.categoryId;

			//bind list with the Products of the currently selected Category
			view.productList.bindAggregation("items", {
				path : sap.app.config.productCollection, 
				sorter : new sap.ui.model.Sorter("Name", false),
				filters: [new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, id)],
				template : view.productTemplate
			});
		}
	},

	//clicking on any product in the list
	productDetailsTap : function(evt) {
		var param = { context : evt.oSource.getBindingContext() };
		appC.navTo("ProductDetails", true, undefined, param);
	},

	//navigation to previous page
	navButtonTap : function(evt) { 
		appC.navBack();
	},

	//clicking on the cart icon
	cartButtonTap : function(evt){
		appC.navTo("Order", true, undefined, "");
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
//	onAfterRendering: function() {

//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
//	onExit: function() {

//	}

});