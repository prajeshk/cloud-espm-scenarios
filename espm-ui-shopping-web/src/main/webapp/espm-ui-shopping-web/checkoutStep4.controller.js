sap.ui.controller("espm-ui-shopping-web.checkoutStep4", {

	onBeforeRendering: function(){
		// since the row repeater and total amount of the shopping cart is used in step1 and step4 (summary page) we have to add it again to the view content
		// restore list of ordered items and total price
		sap.app.utility.restoreControlInContent(sap.ui.getCore().byId("summary-content-of-items"),sap.ui.getCore().byId("checkout-cart-rr") );
		sap.app.utility.restoreControlInContent(sap.ui.getCore().byId("summary-content-of-total"),sap.ui.getCore().byId("checkout-cart-total-amount") );

	},

	onAfterRendering: function(){
		var aQuantityFields = jQuery("input");
		for (var i = 0; i < aQuantityFields.length; i++){
			// set the quantity fields on the summary page to disabled
			var id = jQuery("input")[i].id;
			if (id.indexOf("checkout-quantity-field") == 0){
				sap.ui.getCore().byId(id).setEnabled(false);			
			}
		}
	}

});
