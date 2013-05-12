jQuery.sap.require("sap.m.MessageToast");
sap.ui.controller("espm-mobile-shopping.ProductDetails", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {

	},

	onBeforeShow : function(evt) {
		var view = this.getView();
		// bind this view to the current product
		view.setBindingContext(evt.data.context);
		curContext = evt.data.context;
	},

	//clicking on add to cart button
	addToCartButtonTap : function(evt) {
		var successMsg= appC.i18n.getProperty("PRODUCT_ADD_LABEL");
		var infoMsg= appC.i18n.getProperty("PRODUCT_ALREADY_ADDED_LABEL");
		var cartObject = new Object();
		var count=0;
		if (appC.cartItems.length == 0){
			sap.m.MessageToast.show(successMsg);
			cartObject.name = sap.ui.getCore().getModel().getProperty(curContext + "/Name", curContext, false);
			cartObject.productId = sap.ui.getCore().getModel().getProperty(curContext + "/ProductId", curContext, false);
			cartObject.price = sap.ui.getCore().getModel().getProperty(curContext + "/Price", curContext, false);
			cartObject.quantity = 1;
			cartObject.description = sap.ui.getCore().getModel().getProperty(curContext + "/LongDescription", curContext, false);
			cartObject.width = sap.ui.getCore().getModel().getProperty(curContext + "/DimensionWidth", curContext, false);
			cartObject.height = sap.ui.getCore().getModel().getProperty(curContext + "/DimensionHeight", curContext, false);
			cartObject.depth = sap.ui.getCore().getModel().getProperty(curContext + "/DimensionDepth", curContext, false);
			cartObject.weight = sap.ui.getCore().getModel().getProperty(curContext + "/Weight", curContext, false);
			cartObject.weightUnit = sap.ui.getCore().getModel().getProperty(curContext + "/WeightUnit", curContext, false);

			appC.cartItems[appC.cartItems.length] = cartObject;	
		}else {
			var currentId = (sap.ui.getCore().getModel().getProperty(curContext + "/ProductId", curContext, false));
			for (var i=0;i<appC.cartItems.length;i++){
				if(currentId == appC.cartItems[i].productId){
					count++;
					break;
				}
			}

			if (count > 0) {
				sap.m.MessageToast.show(infoMsg);
			}else{
				sap.m.MessageToast.show(successMsg);
				cartObject.name = sap.ui.getCore().getModel().getProperty(curContext + "/Name", curContext, false);
				cartObject.productId = sap.ui.getCore().getModel().getProperty(curContext + "/ProductId", curContext, false);
				cartObject.price = sap.ui.getCore().getModel().getProperty(curContext + "/Price", curContext, false);
				cartObject.quantity = 1;
				cartObject.description = sap.ui.getCore().getModel().getProperty(curContext + "/LongDescription", curContext, false);
				cartObject.width = sap.ui.getCore().getModel().getProperty(curContext + "/DimensionWidth", curContext, false);
				cartObject.height = sap.ui.getCore().getModel().getProperty(curContext + "/DimensionHeight", curContext, false);
				cartObject.depth = sap.ui.getCore().getModel().getProperty(curContext + "/DimensionDepth", curContext, false);
				cartObject.weight = sap.ui.getCore().getModel().getProperty(curContext + "/Weight", curContext, false);
				cartObject.weightUnit = sap.ui.getCore().getModel().getProperty(curContext + "/WeightUnit", curContext, false);

				appC.cartItems[appC.cartItems.length] = cartObject;	
			}
		}
	},

	//clicking on order button
	cartButtonTap : function(evt) {
		var param = { context : evt.oSource.getBindingContext() };
		appC.navTo("Order", true, undefined, param);
	},

	//navigation to previous page
	navButtonTap : function(evt) { 
		appC.navBack();
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