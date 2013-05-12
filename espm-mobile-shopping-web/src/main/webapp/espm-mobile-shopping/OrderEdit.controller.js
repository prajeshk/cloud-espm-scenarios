sap.ui.controller("espm-mobile-shopping.OrderEdit", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {

	},

	onBeforeShow : function(evt) {
		var view = this.getView();
		view.nameValue.setText(evt.data.productName);
		view.priceValue.setText((Math.round(evt.data.productPrice * 10)/10) + sap.app.config.currencySymbol);
		view.descValue.setText(evt.data.productDescription);
		view.quantityInput.getContent()[0].setValue(evt.data.productQuantity);
		view.quantityInput.getContent()[0].addCustomData(new sap.ui.core.CustomData({
			key: "index",
			value: evt.data.productIndex
		}));
	},

	//navigation to previous page
	navButtonTap : function(evt) { 
		var view = this.getView();
		var quantity = view.quantityInput.getContent()[0].getValue();
		if(quantity < 1 || quantity > 99999){
			sap.m.MessageBox.show(
					"{i18n>DIALOG_TEXT4}",
					sap.m.MessageBox.Icon.ERROR, 
					"{i18n>DIALOG_TITLE}", 
					[sap.m.MessageBox.Action.OK]
			);			
		}
		else{
			appC.navBack();
		}
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