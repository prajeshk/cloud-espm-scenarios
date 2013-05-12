sap.ui.controller("espm-ui-shopping-web.checkoutStep1", {

	onBeforeRendering: function(){
		// since the row repeater total amount of the shopping cart is used in step1 and step4 (summary page) we have to add it again to the view content
		// restore list of ordered items and total price
		sap.app.utility.restoreControlInContent(sap.ui.getCore().byId("checkout-content-of-items"),sap.ui.getCore().byId("checkout-cart-rr") );
		sap.app.utility.restoreControlInContent(sap.ui.getCore().byId("checkout-content-of-total"),sap.ui.getCore().byId("checkout-cart-total-amount") );

		// get control for product sorter and set it again to the view because it could be reused in other products view
		// register view as listener for event and set initial entry to combo box of sorter
		sap.app.utility.restoreSorterControl(this.getView());
	},

	onAfterRendering: function() {

		// is the shopping cart is empty disable the proceed button and the further steps of the roadmap control
		var oShoppingCart = sap.ui.getCore().byId("shopping-cart-rr");
		var bEnabled = oShoppingCart.getRows().length == 0 ? false : true;

		sap.app.checkoutController.setNextStepEnabled(bEnabled,"checkoutStep1");

		var aQuantityFields = jQuery("input");
		for (var i = 0; i < aQuantityFields.length; i++){
			// set the quantity fields in the shopping cart to enabled
			var id = jQuery("input")[i].id;
			if (id.indexOf("checkout-quantity-field") == 0){
				sap.ui.getCore().byId(id).setEnabled(true);			
			}
		}
		
	}
});
